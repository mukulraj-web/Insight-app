import { scrapeAmazon } from "@/lib/scraper";
import { analyzeProducts } from "@/lib/analyser";
import { opportunityScore } from "@/lib/opportunityScore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { keyword } = body;

    if (!keyword) {
      return NextResponse.json(
        { error: "Keyword is required" },
        { status: 400 }
      );
    }

    const results = await scrapeAmazon(keyword);
    const analysis = analyzeProducts(results);
    const opportunityAnalysis = opportunityScore(analysis);

    return NextResponse.json({
      success: true,
      query: keyword,
      insights: {
        productName: keyword,
        productCount: analysis.productCount,
        priceRange: analysis.insights.priceRange,
        averageRating: analysis.averageRating,
        averagePrice: analysis.averagePrice,
        opportunity_scores: opportunityAnalysis.opportunity_scr,
        competitionLevel: opportunityAnalysis.competition_level,
        averageReviewCount: analysis.averageReviewCount,
      },
    });
  } catch (error) {
    // console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze Amazon products" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchQuery = request.nextUrl.searchParams.get("q");

    if (!searchQuery) {
      return NextResponse.json(
        { error: "Search query parameter 'q' is required" },
        { status: 400 }
      );
    }

    const results = await scrapeAmazon(searchQuery);
    const analysis = analyzeProducts(results);
    const opportunityAnalysis = opportunityScore(analysis);


    return NextResponse.json({
      success: true,
      query: searchQuery,
      insights: {

        productName : searchQuery,
        productCount: analysis.productCount,
        priceRange: analysis.insights.priceRange,
        averageRating: analysis.averageRating,
        averagePrice: analysis.averagePrice,
        opportunity_scores : opportunityAnalysis.opportunity_scr,
        competitionLevel : opportunityAnalysis.competition_level,
        averageReviewCount: analysis.averageReviewCount,
      },
      // detailedInsights: analysis.insights,
      // rawData: results, // Optional: include raw data if needed
    });
  } catch (error) {
    // console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze Amazon products" },
      { status: 500 }
    );
  }
}
