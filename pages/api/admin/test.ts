// pages/api/admin/test.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDb } from "@/lib/connectDb";
import {User} from "@/lib/model/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDb();
    const users = await User.find({});
    res.status(200).json({ success: true, users });
  } catch (err: any) {
    console.error("API error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}
