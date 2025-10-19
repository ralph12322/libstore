import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/lib/model/user"; // Adjust path to your User model
import { connectDb } from "@/lib/connectDb";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      await connectDb();

      const token = req.cookies.authToken;
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { payload } = await jwtVerify(token, JWT_SECRET);
      const user = (payload as { user: { id: string; role: string } })?.user;

      if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admin access required" });
      }

      // Fetch all users, excluding passwords
      const users = await User.find({}).select("-password").sort({ createdAt: -1 });
      
      return res.status(200).json(users);
    } catch (err: any) {
      console.error("Error in GET /api/admin/users:", err);
      return res.status(500).json({ message: "Server error", error: err.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}