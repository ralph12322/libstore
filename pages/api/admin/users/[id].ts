import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/lib/model/user";
import { connectDb } from "@/lib/connectDb";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    try {
      await connectDb();

      const token = req.cookies.authToken;
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { payload } = await jwtVerify(token, JWT_SECRET);
      const adminUser = (payload as { user: { id: string; role: string } })?.user;

      if (!adminUser || adminUser.role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admin access required" });
      }

      const { id } = req.query;
      const { role } = req.body;

      if (!id || !role) {
        return res.status(400).json({ message: "User ID and role are required" });
      }

      // Validate role
      const validRoles = ["customer", "seller", "Admin"];
      if (!validRoles.includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { role },
        { new: true }
      ).select("-password");

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(updatedUser);
    } catch (err: any) {
      console.error("Error in PUT /api/admin/users/[id]:", err);
      return res.status(500).json({ message: "Server error", error: err.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}