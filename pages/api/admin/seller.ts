// pages/api/admin/seller.ts
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { User } from "@/lib/model/user";
import { connectDb } from "@/lib/connectDb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDb();

    const token = req.cookies.authToken;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.user._id);
    if (!user || user.role !== "seller") return res.status(401).json({ message: "Not a seller" });
    return res.status(200).json(user);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
