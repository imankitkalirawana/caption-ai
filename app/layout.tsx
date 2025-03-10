import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Sonner from '@/components/providers';
import { Providers } from './providers';
import Navbar from '@/components/navbar';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: 'Caption AI - Divinely Developer',
  description:
    'Caption AI by Divinely Developer generates perfect captions for Instagram, LinkedIn, and Twitter (X) using advanced AI. Get engaging, creative, and trending captions in seconds!',
  keywords:
    'Caption AI, Instagram Captions, LinkedIn Captions, Twitter Captions, AI Captions, Social Media Captions, Social Media Marketing, Social Media Strategy, Social Media Content, Social Media Engagement, Social Media Growth, Social Media Marketing, Social Media Strategy, Social Media Content, Social Media Engagement, Social Media Growth',
  authors: [
    { name: 'Divinely Developer', url: 'https://captions.divinely.dev' }
  ],
  creator: 'Divinely Developer',
  openGraph: {
    type: 'website',
    title: 'Divinely Captions - Social Media Captions Generator',
    description:
      'Generate perfect captions for Instagram, LinkedIn, and Twitter (X) using advanced AI.',
    siteName: 'Divinely Captions'
  },
  icons: {
    icon: '/favicon.ico'
  },
  category: 'social media',
  robots: {
    index: true,
    follow: true
  }
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="light">
      <body>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="light">
            <Navbar />
            {children}

            <Sonner />
          </ThemeProvider>
        </Providers>
        <GoogleAnalytics gaId="G-ZEQM457NLW" />
      </body>
    </html>
  );
}
