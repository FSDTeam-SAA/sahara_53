// Type definitions
interface Story {
  id: string;
  title: string;
  url?: string;
}

interface SearchBarProps {
  placeholder?: string;
  stories: Story[];
  onStoryClick?: (story: Story) => void;
}

interface StoryListItemProps {
  story: Story;
  onClick?: (story: Story) => void;
}


export type {Story, SearchBarProps, StoryListItemProps}