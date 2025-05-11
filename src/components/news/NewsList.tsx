// src/components/news/NewsList.tsx
import { Fragment } from "react";
import NewsCard from "./NewsCard";
import Pagination from "../ui/Pagination";
import { NewsArticle } from "@/types/news";

type NewsListProps = {
  news: NewsArticle[];
  pagination: {
    total: number;
    pages: number;
    page: number;
    pageSize: number;
  };
};

export default function NewsList({ news, pagination }: NewsListProps) {
  // Check if there are no news items
  if (news.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h3 className="text-xl font-medium mb-2">
          ニュースが見つかりませんでした
        </h3>
        <p className="text-gray-500">
          検索条件に一致するニュース記事はありませんでした。フィルターを変更してお試しください。
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* News list */}
      <div className="space-y-6">
        {news.map((article) => (
          <Fragment key={article.id}>
            <NewsCard article={article} />
          </Fragment>
        ))}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="py-4">
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.pages}
          />
        </div>
      )}
    </div>
  );
}

