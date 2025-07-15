import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  try {
    const blogs = await prisma.blog.findMany({
      where: {
        authorId: userId as string,
        published: true
      },
      select: {
        id: true,
        title: true,
        slug: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10 // Limit to 10 most recent blogs
    });

    res.status(200).json({ blogs });
  } catch (error) {
    console.error('Error fetching user blogs:', error);
    res.status(500).json({ error: 'Error fetching user blogs' });
  }
}