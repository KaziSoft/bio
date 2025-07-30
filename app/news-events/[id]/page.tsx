import { notFound } from 'next/navigation';
import Image from 'next/image';

interface NewsEvent {
  _id: string;
  title: string;
  date: string;
  summary: string;
  description: string;
  image: string;
  type: 'news' | 'event';
  location?: string;
}

// Define the type of the page props (params object) explicitly:
interface PageProps {
  params: {
    id: string;
  };
}

export default async function NewsEventDetailsPage({ params }: PageProps) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news-events/${params.id}`, {
    cache: 'no-store',
  });

  if (!res.ok) return notFound();

  const newsEvent: NewsEvent = await res.json();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{newsEvent.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {newsEvent.date} {newsEvent.location && `| ${newsEvent.location}`}
      </p>

      <div className="w-full h-64 md:h-96 relative mb-8 rounded-lg overflow-hidden">
        <Image
          src={newsEvent.image}
          alt={newsEvent.title}
          fill // since Next.js 13, use 'fill' instead of layout="fill"
          style={{ objectFit: 'cover' }}
          className="rounded-lg"
        />
      </div>

      <p className="text-lg leading-relaxed whitespace-pre-line">
        {newsEvent.description || newsEvent.summary}
      </p>
    </div>
  );
}
