// import { scrapeAmazon } from "@/lib/scraper";
// import { analyzeProducts } from "@/lib/analyser";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   try {
//     const searchQuery = request.nextUrl.searchParams.get("q");

//     if (!searchQuery) {
//       return NextResponse.json(
//         { error: "Search query parameter 'q' is required" },
//         { status: 400 }
//       );
//     }

//     const results = await scrapeAmazon(searchQuery);
//     const analysis = analyzeProducts(results);

//     return NextResponse.json({
//       success: true,
//       query: searchQuery,
//       insights: {
//         productCount: analysis.productCount,
//         averagePrice: analysis.averagePrice,
//         averageRating: analysis.averageRating,
//         averageReviewCount: analysis.averageReviewCount,
//       },
//       detailedInsights: analysis.insights,
//     });
//   } catch (error) {
//     console.error("Analysis error:", error);
//     return NextResponse.json(
//       { error: "Failed to analyze Amazon products" },
//       { status: 500 }
//     );
//   }
// }
