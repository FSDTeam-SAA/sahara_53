'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Search,X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchBarProps, Story } from '@/lib/type/search';
import { StoryListItem } from './StoryListItem';

// Reusable SearchBar Component with Modal
const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Search", 
  stories,
  onStoryClick
}) => {
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  // Derive filtered stories during render (no useEffect needed)
  const filteredStories = query.trim() 
    ? stories.filter(story =>
        story.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // Derive isOpen from query state - modal shows when there's a query
  const isOpen = query.trim() !== '';

  // Close modal when clicking outside by clearing the query
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStoryClick = (story: Story) => {
    onStoryClick?.(story);
    setQuery('');
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="relative">
        <Button
          onClick={() => {}}
          className="absolute right-0 top-0 h-full px-6 bg-primary-gradient hover:opacity-90 text-white rounded-l-none z-10 transition-opacity"
        >
          <Search className="w-5 h-5 mr-2" />
          {placeholder}
        </Button>
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-40 h-12 text-base"
          placeholder="Type to search..."
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-36 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors z-20"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Results Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/20 z-40" />
          
          {/* Modal */}
          <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-2xl overflow-hidden z-50 max-h-[400px] overflow-y-auto">
            {filteredStories.length > 0 ? (
              filteredStories.map((story) => (
                <StoryListItem
                  key={story.id}
                  story={story}
                  onClick={handleStoryClick}
                />
              ))
            ) : (
              <div className="px-6 py-12 text-center text-gray-500">
                No stories found matching &#34;{query}&#34;
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

// Main App Component
const StorySearchApp: React.FC = () => {
  const stories: Story[] = [
    { id: '1', title: 'The Adventure Begins', url: '/story/1' },
    { id: '2', title: 'Mystery in the Mansion', url: '/story/2' },
    { id: '3', title: 'Journey to the Mountains', url: '/story/3' },
    { id: '4', title: 'Tales from the Sea', url: '/story/4' },
    { id: '5', title: 'The Lost City', url: '/story/5' },
    { id: '6', title: 'Beyond the Horizon', url: '/story/6' },
    { id: '7', title: 'Echoes of Tomorrow', url: '/story/7' },
    { id: '8', title: 'The Hidden Garden', url: '/story/8' },
    { id: '9', title: 'Whispers in the Wind', url: '/story/9' },
    { id: '10', title: 'Chronicles of the Forest', url: '/story/10' },
  ];

  const handleStoryClick = (story: Story) => {
    console.log('Story clicked:', story);
    alert(`You clicked: ${story.title}`);
    // In a real Next.js app, you'd use: router.push(story.url)
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Search */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-light text-gray-800">Story Name Here</h1>
          <SearchBar 
            placeholder="Search" 
            stories={stories}
            onStoryClick={handleStoryClick}
          />
        </div>

        {/* Static Story List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {stories.map((story) => (
            <StoryListItem
              key={story.id}
              story={story}
              onClick={handleStoryClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StorySearchApp;