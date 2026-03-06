import { getCMSProvider } from "@/lib/cms/cms-provider";
import { StoryContent } from "@/components/story/StoryContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story | Fehmi Farzana Designs",
  description:
    "Learn about the mission and philosophy of Fehmi Farzana Designs. Discover the story behind our unique, sustainable, and ethically made clothing.",
  openGraph: {
    title: "Our Story | Fehmi Farzana Designs",
    description:
      "Learn about the mission and philosophy of Fehmi Farzana Designs. Discover the story behind our unique, sustainable, and ethically made clothing.",
  },
  twitter: {
    title: "Our Story | Fehmi Farzana Designs",
    description:
      "Learn about the mission and philosophy of Fehmi Farzana Designs. Discover the story behind our unique, sustainable, and ethically made clothing.",
  },
};

export default async function StoryPage() {
  const provider = getCMSProvider();
  const storyData = await provider.getStoryData();

  return <StoryContent data={storyData} />;
}
