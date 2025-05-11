// src/components/layout/Sidebar.tsx
'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

type Category = {
  name: string;
  nameJa: string;
  slug: string;
};

type SidebarProps = {
  filters: {
    sources: string[];
    categories: Category[];
  };
  selectedSource?: string;
  selectedCategory?: string;
  fromDate?: string;
  toDate?: string;
};

export default function Sidebar({
  filters,
  selectedSource,
  selectedCategory,
  fromDate,
  toDate,
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  // States for filter inputs
  const [source, setSource] = useState(selectedSource || '');
  const [category, setCategory] = useState(selectedCategory || '');
  const [dateFrom, setDateFrom] = useState(fromDate || '');
  const [dateTo, setDateTo] = useState(toDate || '');
  
  // Function to apply filters
  const applyFilters = () => {
    // Build query params
    const params = new URLSearchParams();
    
    if (source) params.set('source', source);
    if (category) params.set('category', category);
    if (dateFrom) params.set('fromDate', dateFrom);
    if (dateTo) params.set('toDate', dateTo);
    
    // Navigate with new params
    router.push(`${pathname}?${params.toString()}`);
  };
  
  // Function to clear all filters
  const clearFilters = () => {
    setSource('');
    setCategory('');
    setDateFrom('');
    setDateTo('');
    router.push(pathname);
  };

  return (
    <aside className="bg-gray-50 p-4 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">フィルター</h2>
      
      {/* Sources filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ニュースソース
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        >
          <option value="">すべてのソース</option>
          {filters.sources.map((src) => (
            <option key={src} value={src}>
              {src}
            </option>
          ))}
        </select>
      </div>
      
      {/* Categories filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          カテゴリー
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">すべてのカテゴリー</option>
          {filters.categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.nameJa}
            </option>
          ))}
        </select>
      </div>
      
      {/* Date range filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          期間 (開始)
        </label>
        <input
          type="date"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          期間 (終了)
        </label>
        <input
          type="date"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
        />
      </div>
      
      {/* Action buttons */}
      <div className="flex flex-col gap-2">
        <button
          onClick={applyFilters}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          フィルター適用
        </button>
        <button
          onClick={clearFilters}
          className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
        >
          クリア
        </button>
      </div>
      
      {/* Quick links */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-2">クイックリンク</h3>
        <ul className="space-y-2">
          <li>
            <Link href="/" className="text-blue-600 hover:underline">
              最新ニュース
            </Link>
          </li>
          <li>
            <Link href="/archive" className="text-blue-600 hover:underline">
              アーカイブ
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}