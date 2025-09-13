import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { User } from '@/lib/model/user';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, email, password } = req.body;

  const existingMail = await User.findOne({ email });
  if (existingMail) return res.status(400).json({ error: 'User with this email already exists' });

  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).json({ error: 'User with this username already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    username,
    email,
    password: hashedPassword,
    role: 'User',
  });

  res.status(201).json({ message: 'User created successfully' });
}
