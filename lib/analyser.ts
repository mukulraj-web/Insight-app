interface Product {
  name: string;
  price: string;
  rating: string;
  reviewCount: string;
  topReviews: string[];
}

interface AnalysisResult {
  productCount: number;
  averagePrice: number;
  averageRating: number;
  averageReviewCount: number;
  insights: {
    priceRange: { min: number; max: number };
    ratingDistribution: { [key: string]: number };
    totalReviews: number;
  };
}

export function analyzeProducts(products: Product[]): AnalysisResult {
  if (!products || products.length === 0) {
    return {
      productCount: 0,
      averagePrice: 0,
      averageRating: 0,
      averageReviewCount: 0,
      insights: {
        priceRange: { min: 0, max: 0 },
        ratingDistribution: {},
        totalReviews: 0,
      },
    };
  }

  let totalPrice = 0;
  let validPriceCount = 0;
  let totalRating = 0;
  let validRatingCount = 0;
  let totalReviewCount = 0;
  let validReviewCount = 0;

  const ratingDistribution: { [key: string]: number } = {};
  let minPrice = Infinity;
  let maxPrice = -Infinity;

  products.forEach((product) => {
    // Parse price
    const priceMatch = product.price.match(/[\d,]+/);
    if (priceMatch) {
      const price = parseFloat(priceMatch[0].replace(/,/g, ''));
      if (!isNaN(price)) {
        totalPrice += price;
        validPriceCount++;
        minPrice = Math.min(minPrice, price);
        maxPrice = Math.max(maxPrice, price);
      }
    }

    // Parse rating
    const ratingMatch = product.rating.match(/(\d+\.?\d*)/);
    if (ratingMatch) {
      const rating = parseFloat(ratingMatch[1]);
      if (!isNaN(rating) && rating >= 0 && rating <= 5) {
        totalRating += rating;
        validRatingCount++;

        // Rating distribution (rounded to nearest 0.5)
        const roundedRating = Math.round(rating * 2) / 2;
        ratingDistribution[roundedRating] = (ratingDistribution[roundedRating] || 0) + 1;
      }
    }

    // Parse review count
    const reviewMatch = product.reviewCount.match(/(\d+(?:\.\d+)?)(K?)/);
    if (reviewMatch) {
      let reviewCount = parseFloat(reviewMatch[1]);
      if (reviewMatch[2] === 'K') {
        reviewCount *= 1000; // Convert K to thousands
      }
      if (!isNaN(reviewCount)) {
        totalReviewCount += reviewCount;
        validReviewCount++;
      }
    }
  });

  const averagePrice = validPriceCount > 0 ? totalPrice / validPriceCount : 0;
  const averageRating = validRatingCount > 0 ? totalRating / validRatingCount : 0;
  const averageReviewCount = validReviewCount > 0 ? totalReviewCount / validReviewCount : 0;

  return {
    productCount: products.length,
    averagePrice: Math.round(averagePrice * 100) / 100, // Round to 2 decimal places
    averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
    averageReviewCount: Math.round(averageReviewCount),
    insights: {
      priceRange: {
        min: minPrice === Infinity ? 0 : minPrice,
        max: maxPrice === -Infinity ? 0 : maxPrice,
      },
      ratingDistribution,
      totalReviews: Math.round(totalReviewCount),
    },
  };
}
