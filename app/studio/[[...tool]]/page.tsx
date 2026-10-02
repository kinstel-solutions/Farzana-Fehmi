import { notFound } from 'next/navigation';
import { isStudioAccessEnabled } from '@/lib/studio-access';
import { Studio } from './Studio';

export const dynamic = 'force-dynamic';

export { metadata, viewport } from 'next-sanity/studio';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function StudioPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const isEnabled = await isStudioAccessEnabled(resolvedSearchParams);

  if (!isEnabled) {
    notFound();
  }

  return <Studio />;
}
