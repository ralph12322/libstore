import { NextApiRequest, NextApiResponse } from "next";
import { Book } from "@/lib/model/books";
import { connectDb } from "@/lib/connectDb";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    try {
      await connectDb();

      const token = req.cookies.authToken;
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Verify token and extract user info
      const data = jwt.verify(token, process.env.JWT_SECRET as string) as any;
      console.log("Authenticated user data:", data);
      const { bookId } = req.body;

      if (!bookId) {
        return res.status(400).json({ message: "Book ID is required" });
      }

      // Find the book and ensure the seller owns it
      const book = await Book.findOne({ _id: bookId, seller: data.user.email });
      if (!book) {
        return res.status(404).json({ message: "Book not found or not authorized" });
      }

      await Book.deleteOne({ _id: bookId, seller: data.user.email });
      return res.status(200).json({ message: "Book deleted successfully" });

    } catch (err: any) {
      console.error("Error in DELETE /api/admin/delete-book:", err);
      return res.status(500).json({ message: "Server error", error: err.message });
    }

  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
