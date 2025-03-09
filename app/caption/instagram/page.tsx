import Instagram from '@/components/caption/instagram';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram Caption Generator',
  description:
    'Generate captions for Instagram using AI. Get engaging, creative, and trending captions in seconds!'
};

export default function InstagramPage() {
  return <Instagram />;
}
