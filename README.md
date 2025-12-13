# Build a Story Time

**Build a Story Time** is an interactive, AI-powered personalized storybook platform designed to bring stories to life. It allows users to create unique storybooks where they can narrate the story with their own voice and feature themselves or their loved ones as characters in the illustrations. This platform empowers imagination, making storytelling a personal and magical experience.

## 🚀 Features

### 📚 Personalized Story Creation

- **AI-Powered Generation**: Create stories based on customizable preferences including genre, style, language, and character names.
- **Voice Cloning & Recording**: Record your own voice to narrate the story.
- **Face Personalization**: Upload a photo to map your face onto the story's characters, creating a truly immersive experience.
- **EPUB Generation**: Generate and download storybooks in EPUB format for offline reading.

### 🎨 Interactive & Visual Experience

- **Ghibli-Style Illustrations**: Beautiful, high-quality illustrations generated in a whimsical Ghibli art style.
- **Interactive Viewer**: A page-by-page story viewer with integrated voice playback for a read-along experience.
- **Real-time Preview**: See your story come to life as you create it.

### 🛒 Products(Books) & E-commerce

<!-- - **Browse Books**: Explore the "Search Book" section to find new stories. -->

- **My Orders**: Track your purchased books and order history.
- **Product Catalog**: View available storybook products and formats.
- **Secure Payments**: Integrated payment processing for seamless transactions.

### 👤 User & Admin Dashboard

- **User Dashboard**: Manage your profile, view order history, and access your created stories.
- **Admin Dashboard**: Comprehensive control panel for administrators.
  - **Overview**: View total users, orders, revenue, and story statistics.
  - **Management**: Manage users, orders, and content.
  - **Revenue Tracking**: Visual charts and data tables to monitor business performance.

## 🛠️ Tech Stack

This project is built with a modern, high-performance technology stack:

- **Frontend Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **File Generation**: [epub-gen-memory](https://www.npmjs.com/package/epub-gen-memory) (EPUB creation)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)

## 📂 Project Structure

```
src/
├── app/                 # Next.js App Router pages and layouts
│   ├── (auth)/          # Authentication routes (login, register, etc.)
│   ├── (website)/       # Public website routes (home, create-book, search-book, etc.)
│   ├── dashboard/       # Protected user/admin dashboard routes
│   └── api/             # API route handlers
├── components/          # Reusable UI components
│   ├── ui/              # Shadcn UI primitive components
│   ├── dashboard/       # Dashboard-specific components
│   └── website/         # Website-specific components
├── lib/                 # Utility functions and configurations
│   ├── api.ts           # API service layer
│   ├── utils.ts         # Helper functions
│   └── types.ts         # TypeScript type definitions
└── hooks/               # Custom React hooks
```

## ⚡ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js**: Version 20 or higher is recommended.
- **npm** or **yarn**: Package manager.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd sahara_53
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Setup:**
    Create a `.env.local` file in the root directory and configure the necessary environment variables.

    ```env
    NEXT_PUBLIC_API_URL=http://localhost:3000/api
    # Add other necessary variables (e.g., NextAuth secret)
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License.
