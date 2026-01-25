
import { getCMSProvider } from '@/lib/cms/cms-provider';
import { StoryContent } from '@/components/story/StoryContent';

export default async function StoryPage() {
  const provider = getCMSProvider();
  const storyData = await provider.getStoryData();

  return <StoryContent data={storyData} />;
}
