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

// export interface Order {
//   _id: string;
//   userId: string;
//   title: string;
//   language: string;
//   style: string;
//   genre: string;
//   beginning: string;
//   chapterCount: number;

//   characters: {
//     name: string;
//     _id: string;
//   }[];

//   generatedStory: {
//     _id: string;
//     chapter: number;
//     title: string;
//     text: string;
//     audioUrl: string | null;
//     chapterImage: string;
//   }[];

//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

export interface Order {
  _id: string;

  // userId may be null or contain only _id + email
  userId: {
    _id?: string;
    name?: string;
    email?: string;
    phone?: string;
  } | null;

  // Optional fields because some orders don't include them
  bookName?: string;
  date?: string;
  location?: string;

  formate: string;
  price: number;
  status: string;

  // Storybook order
  storyBookId?: {
    _id: string;
    userId: string;
    title: string;
    language: string;
    style: string;
    genre: string;
    characters: { name: string; _id: string }[];
    beginning: string;
    chapterCount: number;
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
    voiceId?: string;
  };

  createdAt: string;
  updatedAt: string;
  __v: number;
}
