import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { generateToken } from '@/lib/auth';
import { User } from '@/lib/model/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = generateToken({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    res.setHeader(
      'Set-Cookie',
      `authToken=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict`
    );
    res.status(200).json({ message: 'Logged in successfully' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
}
