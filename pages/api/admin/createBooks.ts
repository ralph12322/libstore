import { NextApiRequest, NextApiResponse } from "next";
import { Book } from "@/lib/model/books";
import { connectDb } from "@/lib/connectDb";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === "POST") {
    try {
      await connectDb();
      const token = req.cookies.authToken;
      if (!token) return res.status(401).json({ message: "Unauthorized" });
      const data = jwt.verify(token, process.env.JWT_SECRET as string) as any;


      const { title, author, price, image } = req.body;
      console.log("HFHASDHFDOASFADS",data.user._id)

      const newBook = await Book.create({
        title,
        author,
        price,
        image,
        seller: data.user.email,
      });

      return res.status(201).json(newBook);
    } catch (err: any) {
      console.error("Error in POST /api/admin/books:", err);
      return res.status(500).json({ message: "Server error", error: err.message });

    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }

}
