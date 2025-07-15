import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  try {
    // Find user by ID
    const user = await prisma.user.findUnique({
      where: { 
        id: userId as string 
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        image: true,
        bio: true,
        socialLinks: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Format the response
    const response = {
      user: {
        ...user,
        profilePhoto: user.image,
        socialLinks: user.socialLinks as {
          twitter?: string;
          linkedin?: string;
          github?: string;
          website?: string;
        } || {}
      }
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Error fetching user data' });
  }
}