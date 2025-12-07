export interface ICharacter {
  name: string;
  _id: string;
}

export interface IGeneratedChapter {
  _id: string;
  chapter: number;
  title: string;
  text: string;
  chapterImage: string;
  audioUrl: string | null;
}

export interface IBook {
  _id: string;
  userId: string;
  title: string;
  beginning: string;
  genre: string;
  language: string;
  style: string;
  chapterCount: number;
  characters: ICharacter[];
  generatedStory: IGeneratedChapter[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
