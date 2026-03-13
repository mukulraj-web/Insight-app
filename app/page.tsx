"use client"
import { useState } from "react";
import SearchBox from "@/components/searchBox";
import ProductCard, { ProductInsights } from "@/components/productCard";

export default function Home() {
  const [insights, setInsights] = useState<ProductInsights | undefined>(undefined);

  const handleSearchResults = (data: any) => {
    if (data.insights) {
      setInsights(data.insights);
    }
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-blue-50 to-indigo-100 rounded-xl">
      {/* Hero Section */}
      <div className="w-full  py-5 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl">
        <div className="px-3">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            MarketInsight AI
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl ">
            Product Research & Market Analysis Tool powered by AI.
                 </p>


        </div>

      </div>
      <SearchBox onSearchResults={handleSearchResults} />

      <div className="px-3 mt-8">
        <ProductCard insights={insights} />
      </div>

    </div>
  );
}
 