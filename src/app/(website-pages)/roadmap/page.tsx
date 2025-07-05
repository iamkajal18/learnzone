import RoadMap from '@/components/roadmaps/Main';
import React from 'react';

// ✅ SEO metadata — you can modify the text below for LearningZone
export const metadata = {
  title: 'Roadmap - LearningZone',
  keywords: [
    'LearningZone', 'roadmap', 'career roadmap', 'learning path',
    'python roadmap', 'java roadmap', 'web development roadmap',
    'frontend roadmap', 'backend roadmap', 'placement preparation'
  ],
  description: 'Explore the complete programming and placement roadmap at LearningZone.',
  openGraph: {
    title: 'LearningZone Roadmap',
    description: 'Explore programming, tech, and placement roadmaps for all major fields.',
    url: 'https://learningzone.vercel.app/roadmap',
    siteName: 'LearningZone',
    images: [
      {
        url: 'https://learningzone.vercel.app/', // optional: create an OG image
        width: 1200,
        height: 630,
        alt: 'LearningZone Roadmap',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LearningZone Roadmap',
    description: 'Explore programming, tech, and placement roadmaps.',
    images: ['https://learningzone.vercel.app/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  appleWebApp: {
    capable: true,
    title: 'LearningZone Roadmap',
    statusBarStyle: 'default',
  },
  alternates: {
    canonical: 'https://learningzone.vercel.app/roadmap',
    languages: {
      'en-US': 'https://learningzone.vercel.app/roadmap',
    },
  },
};

// ✅ viewport + themeColor must go here (Next.js 15 rule)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
};

export default function page() {
  return <RoadMap />;
}
