export const SAMPLE_BOOKS = [
  {
    id: "1",
    image: "/images/book.jpg",
    status: "Completed" as const,
    category: "Children",
    chapter: "Chapter: 10",
    title: "Story Name Here",
    description:
      "Discover vibrant, fun, and personalized stories brought to life with your own voice and favorite characters...",
  },
  {
    id: "2",
    image: "/images/book1.jpg",
    status: "Reading" as const,
    category: "Adventure",
    chapter: "Chapter: 5",
    title: "The Great Adventure",
    description:
      "Embark on an epic journey through mystical lands and discover hidden treasures...",
  },
  {
    id: "3",
    image: "/images/book2.jpg",
    status: "Completed",
    category: "Fantasy",
    chapter: "Chapter: 15",
    title: "Magic Realm",
    description:
      "Step into a world of magic, mystery, and enchantment where anything is possible...",
  },
  {
    id: "4",
    image: "/images/book.jpg",
    status: "Reading",
    category: "Sci-Fi",
    chapter: "Chapter: 8",
    title: "Space Explorer",
    description:
      "Journey through the cosmos and encounter extraordinary civilizations and wonders...",
  },
  {
    id: "5",
    image: "/images/book2.jpg",
    status: "Completed",
    category: "Mystery",
    chapter: "Chapter: 12",
    title: "The Secret Detective",
    description:
      "Unravel complex mysteries and solve puzzling cases with our brilliant detective...",
  },
  {
    id: "6",
    image: "/images/book2.jpg",
    status: "Reading",
    category: "Romance",
    chapter: "Chapter: 9",
    title: "Hearts Connect",
    description:
      "A touching tale of love, friendship, and personal growth across beautiful landscapes...",
  },
];

export type BookItem = (typeof SAMPLE_BOOKS)[0];
