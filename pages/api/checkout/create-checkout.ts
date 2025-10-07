// pages/api/create-checkout.ts
import type { NextApiRequest, NextApiResponse } from "next";

const PAYMONGO_ENDPOINT = "https://api.paymongo.com/v1/checkout_sessions";

async function basicAuthHeader() {
    const sk = process.env.PAYMONGO_SECRET || "";
    const token = Buffer.from(`${sk}:`).toString("base64");
    return `Basic ${token}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST")
        return res.status(405).json({ error: "Method not allowed" });

    try {
        const { amount, description } = req.body;

        if (!amount || typeof amount !== "number") {
            return res.status(400).json({
                error: "amount (integer, e.g. 10000 for ₱100.00) is required",
            });
        }

        const successUrl =
            `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/checkout/success`;
        const cancelUrl =
            `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/checkout/cancel`;

        const payload = {
            data: {
                attributes: {
                    amount: Math.round(amount), // ensure integer
                    currency: "PHP",
                    description: description || "Order Payment",
                    payment_method_types: ["gcash", "paymaya", "grab_pay"],
                    success_url: successUrl,
                    cancel_url: cancelUrl,
                    line_items: [
                        {
                            name: description || "Sample Item",
                            amount: Math.round(amount), // convert to integer (e.g. 10000)
                            currency: "PHP",
                            quantity: 1,
                        },
                    ],
                },
            },
        };


        const response = await fetch(PAYMONGO_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: await basicAuthHeader(),
            },
            body: JSON.stringify(payload),
        });

        const json = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({
                error: "PayMongo error",
                detail: json,
            });
        }

        const checkoutUrl = json?.data?.attributes?.checkout_url;
        if (!checkoutUrl)
            return res
                .status(500)
                .json({ error: "Missing checkout_url in PayMongo response", raw: json });

        return res.status(200).json({ checkout_url: checkoutUrl, raw: json });
    } catch (err: any) {
        console.error("create-checkout error:", err);
        return res.status(500).json({
            error: "internal_error",
            detail: err.message || err,
        });
    }
}
