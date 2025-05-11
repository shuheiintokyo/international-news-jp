This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# International News Translation Website

A Next.js application that fetches news from international sources, translates them to Japanese, and displays them on a user-friendly website.

## Features

- **Automatic News Fetching**: Daily cron jobs fetch the latest news from configured sources
- **Japanese Translation**: Automatically translates headlines and content to Japanese
- **Filtering System**: Filter news by source, category, and date range
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Database Storage**: Stores translated articles in a database with automatic cleanup
- **Serverless Deployment**: Ready for deployment on Vercel

## Tech Stack

- **Frontend**: Next.js 14 with App Router, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL via Prisma ORM
- **External APIs**:
  - News APIs (NewsAPI.org, GNews, etc.)
  - Translation APIs (Google Cloud Translation, DeepL)
- **Deployment**: Vercel with Cron Jobs

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- A PostgreSQL database (or use a free tier from Supabase, Railway, or Neon)
- API keys for news and translation services

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/international-news-jp.git
   cd international-news-jp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local` and fill in your API keys and database connection string
   
4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Seed the database with initial categories:
   ```bash
   npx prisma db seed
   ```

6. Run the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

The project follows a modular structure:

- `app/`: Next.js App Router pages and API routes
- `components/`: Reusable React components
- `lib/`: Utility functions and services
- `types/`: TypeScript type definitions
- `prisma/`: Database schema and migrations
- `public/`: Static assets

## Key Components

### Database Models

- **NewsArticle**: Stores news articles with both original and translated content
- **NewsSource**: Configures news sources and API details
- **Category**: Manages news categories
- **JobLog**: Tracks the execution of scheduled jobs

### API Routes

- **/api/cron/fetch-news**: Daily job to fetch and translate news
- **/api/cron/cleanup**: Monthly job to remove old articles
- **/api/news**: Endpoints for news data retrieval

### Pages

- **/** (Homepage): Displays recent news with filtering options
- **/[category]**: Category-specific news listings
- **/news/[id]**: Individual news article detail page
- **/archive**: Historical news archive

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure environment variables in Vercel
4. Deploy

### Setting Up Cron Jobs

Vercel Cron Jobs are configured in the `vercel.json` file:

```json
{
  "crons": [
    {
      "path": "/api/cron/fetch-news",
      "schedule": "0 2 * * *"
    },
    {
      "path": "/api/cron/cleanup",
      "schedule": "0 0 1 * *"
    }
  ]
}
```

## Customization

### Adding News Sources

1. Add the source to the `NewsSource` table
2. Implement a source-specific fetcher in `lib/api/news-sources.ts`
3. Update the `fetchNewsFromSource` function to use your new fetcher

### Changing Translation Service

1. Update the `TRANSLATION_SERVICE` environment variable
2. If needed, implement a new translation service in `lib/api/translation.ts`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Next.js team for the excellent framework
- Vercel for hosting and serverless infrastructure
- Prisma team for the ORM
- Various news and translation API providers
