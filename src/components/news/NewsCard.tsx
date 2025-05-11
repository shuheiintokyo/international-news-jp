// src/components/news/NewsCard.tsx
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { NewsArticle } from "@/types/news";

type NewsCardProps = {
  article: NewsArticle;
};

export default function NewsCard({ article }: NewsCardProps) {
  // Format the date in Japanese format
  const formattedDate = format(new Date(article.publishedAt), "PPP", {
    locale: ja,
  });

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row">
        {/* Thumbnail if available */}
        {article.imageUrl && (
          <div className="md:w-1/4 h-48 md:h-auto relative">
            <Image
              src={article.imageUrl}
              alt={article.titleJa}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className={`p-4 ${article.imageUrl ? "md:w-3/4" : "w-full"}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {article.category}
            </span>
            <span className="text-xs text-gray-500">{formattedDate}</span>
          </div>

          <h2 className="text-xl font-bold mb-2">
            <Link href={`/news/${article.id}`} className="hover:text-blue-600">
              {article.titleJa}
            </Link>
          </h2>

          <p className="text-gray-700 mb-4 line-clamp-3">
            {article.contentJa.substring(0, 200)}
            {article.contentJa.length > 200 ? "..." : ""}
          </p>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              出典: {article.source}
            </span>
            <div className="flex gap-2">
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                原文を読む
              </a>
              <Link
                href={`/news/${article.id}`}
                className="text-sm text-blue-600 hover:underline"
              >
                続きを読む
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
