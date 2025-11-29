import { StoryListItemProps } from "@/lib/type/search";
import { ArrowUpRight } from "lucide-react";

// Reusable Story List Item Component
export const StoryListItem: React.FC<StoryListItemProps> = ({ story, onClick }) => {
  return (
    <div
      onClick={() => onClick?.(story)}
      className="flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0"
    >
      <span className="text-gray-600 text-lg">{story.title}</span>
      <ArrowUpRight className="w-5 h-5 text-gray-400" />
    </div>
  );
};