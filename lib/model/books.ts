import { Schema, model, models, Document } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  price: number;
  image: string;
}

const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

// ✅ Always safe in Next.js + Turbopack
export const Book = models.Book || model<IBook>('Book', BookSchema);
