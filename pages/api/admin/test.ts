import { NextApiRequest, NextApiResponse } from 'next';
import { Book } from '@/lib/model/books';

// Example: Using cookies for session management
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  } 
}