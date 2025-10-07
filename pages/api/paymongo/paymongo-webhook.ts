// pages/api/paymongo-webhook.ts
import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

// Disable Next's default body parser to get raw body
export const config = {
  api: {
    bodyParser: false,
  },
};

function bufferToString(buffer: Buffer | Uint8Array) {
  return Buffer.from(buffer).toString("utf8");
}

async function getRawBody(req: NextApiRequest) {
  const chunks: Uint8Array[] = [];
  for await (const chunk of req as any) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

function parsePaymongoSignature(header: string | undefined) {
  // header example: "t=1496734173,te=...,li=..."
  const map: Record<string, string> = {};
  if (!header) return map;
  header.split(",").forEach((part) => {
    const [k, v] = part.split("=");
    if (k && v) map[k.trim()] = v.trim();
  });
  return map;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const raw = await getRawBody(req);
  const payload = bufferToString(raw);
  const signatureHeader = (req.headers["paymongo-signature"] as string) || (req.headers["paymongo_signature"] as string) || "";

  // You will have a webhook secret when you create a webhook in PayMongo dashboard
  const webhookSecret = process.env.PAYMONGO_WEBHOOK_SECRET || "";

  try {
    // Parse header
    const parts = parsePaymongoSignature(signatureHeader);
    const timestamp = parts["t"];
    const sigTest = parts["te"]; // test mode signature
    const sigLive = parts["li"]; // live mode signature

    // Choose which signature to validate against
    const useTest = process.env.NODE_ENV !== "production";
    const expectedSig = useTest ? sigTest : sigLive;
    if (!timestamp || !expectedSig) {
      console.warn("Missing signature parts", parts);
      return res.status(400).send("Bad signature header");
    }

    // Compute HMAC SHA256 of `${timestamp}.${rawPayload}`
    const toSign = `${timestamp}.${payload}`;
    const computed = crypto.createHmac("sha256", webhookSecret).update(toSign).digest("hex");

    // Use timing-safe compare
    const valid = crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(expectedSig));

    if (!valid) {
      console.warn("Invalid signature", { computed, expectedSig });
      return res.status(401).send("Invalid signature");
    }

    const evt = JSON.parse(payload);
    // Example events to watch: checkout_session.payment.paid, payment.paid, payment.failed
    const eventType = evt?.data?.attributes?.type || evt?.type || "unknown";
    console.log("Received PayMongo webhook:", eventType);

    // Handle the event: update order status in DB, send confirmation email, etc.
    if (eventType === "checkout_session.payment.paid" || eventType === "payment.paid") {
      // mark order as paid in DB, fulfill order, etc.
    }

    return res.status(200).send("OK");
  } catch (err: any) {
    console.error("Webhook handler error:", err);
    return res.status(500).send("Server error");
  }
}
