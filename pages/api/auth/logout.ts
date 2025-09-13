import { NextApiRequest, NextApiResponse } from 'next';

// Example: Using cookies for session management
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Remove the session cookie (adjust cookie name as needed)
  res.setHeader('Set-Cookie', 'authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax');
  res.status(200).json({ message: 'Logged out successfully' });
}