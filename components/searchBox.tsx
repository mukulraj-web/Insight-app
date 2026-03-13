"use client";

import { useState } from "react";

interface SearchBoxProps {
  onSearchResults?: (data: any) => void;
}

export default function SearchBox({ onSearchResults }: SearchBoxProps) {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!keyword) return;

    setLoading(true);

    const res = await fetch("/api/analyse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword }),
    });

    const data = await res.json();

    setLoading(false);

    if (onSearchResults) {
      onSearchResults(data);
    } else {
      // Fallback to old behavior if no callback
      localStorage.setItem("analysis", JSON.stringify(data));
    }
  };

  return (
    <div className="m-10 text-black shadow-2xl p-4 rounded-md border border-blue-400">
      <h1 className="text-blue-500 font-bold  text-3xl">AI-Powered Product Research </h1>
      <div className="font-bold">Product Name or Keyword</div>
      <div className=" mt-4 flex flex-row items-center  gap-4">
      
      <input
        type="text"
        placeholder=" e.g., Wireless Earbuds"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="border p-3 rounded w-80 bg-white"
      />

      <button
        onClick={handleSearch}
        disabled={loading}
        className="bg-black text-white px-6 py-3 rounded"
      >
        {loading ? "Analyzing..." : "Analyze Market"}
      </button>
    </div>
    </div>
  );
}