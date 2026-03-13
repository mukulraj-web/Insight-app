"use client";

export interface ProductInsights {
  productName: string;
  productCount: number;
  priceRange: { min: number; max: number };
  averageRating: number;
  averagePrice: number;
  opportunity_scores: number;
  competitionLevel: string;
  averageReviewCount: number;
}

interface ProductCardProps {
  insights?: ProductInsights | null;
}

export default function ProductCard({ insights }: ProductCardProps) {
  if (!insights) {
    return (
      <div className="border border-gray-300 rounded-lg p-6 shadow-md bg-white">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Product Insights</h2>
        <p className="text-gray-500">Enter a product name in the search box to view market analysis and insights.</p>
      </div>
    );
  }

  return (
    <div className="border border-blue-400 rounded-md p-6 shadow-2xl bg-white">
      <h2 className="text-xl font-bold text-blue-600 mb-4">{insights.productName} <span className="text-blue-300">- Market Insights </span> <span className="text-red-300">prices in ₹ (Rupee) </span></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold text-gray-800">Product Count</h3>
          <p className="text-2xl font-bold text-blue-500">{insights.productCount}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold text-gray-800">Price Range</h3>
          <p className="text-lg text-gray-700">${insights.priceRange.min} - ${insights.priceRange.max}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold text-gray-800">Average Rating</h3>
          <p className="text-2xl font-bold text-yellow-500">{insights.averageRating.toFixed(1)} ⭐</p>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold text-gray-800">Average Price</h3>
          <p className="text-2xl font-bold text-green-500">${insights.averagePrice.toFixed(2)}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold text-gray-800">Opportunity Score</h3>
          <p className="text-2xl font-bold text-purple-500">{insights.opportunity_scores}/10</p>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold text-gray-800">Competition Level</h3>
          <p className="text-lg text-gray-700">{insights.competitionLevel}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded md:col-span-2">
          <h3 className="font-semibold text-gray-800">Average Review Count</h3>
          <p className="text-2xl font-bold text-indigo-500">{insights.averageReviewCount}</p>
        </div>
      </div>
    </div>
  );
}
