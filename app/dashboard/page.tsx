"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/productCard";

interface ProductInsights {
  productName: string;
  productCount: number;
  priceRange: string;
  averageRating: number;
  averagePrice: number;
  opportunity_scores: number;
  competitionLevel: string;
  averageReviewCount: number;
}

export default function Dashboard() {
  const [insights, setInsights] = useState<ProductInsights | null>(null);

  useEffect(() => {
    const storedAnalysis = localStorage.getItem("analysis");
    if (storedAnalysis) {
      try {
        const data = JSON.parse(storedAnalysis);
        if (data.insights) {
          setInsights(data.insights);
        }
      } catch (error) {
        console.error("Error parsing stored analysis:", error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Market Analysis Dashboard</h1>
        <ProductCard insights={insights} />
      </div>
    </div>
  );
}
