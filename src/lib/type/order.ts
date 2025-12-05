export interface BackendBook {
  _id: string;
  userId: string;
  title: string;
  language: string;
  style: string;
  genre: string;
  beginning: string;
  chapterCount: number;

  characters: {
    name: string;
    _id: string;
  }[];

  generatedStory: {
    _id: string;
    chapter: number;
    title: string;
    text: string;
    audioUrl: string | null;
    chapterImage: string;
  }[];

  createdAt: string;
  updatedAt: string;
  __v: number;
}
