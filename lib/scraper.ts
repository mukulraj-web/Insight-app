import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";


import fs from "node:fs"  // we are saving it file here 
export async function scrapeAmazon(searchQuery: string) {
  const browser = await puppeteer.launch({
  args: chromium.args,
  executablePath: await chromium.executablePath(),
  headless: true,
});
  const page = await browser.newPage();

  try {
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(
      searchQuery
    )}`;
    await page.goto(url, { waitUntil: "networkidle2" });

    const results = await page.evaluate(() => {
      const items = document.querySelectorAll(
        "div[data-component-type='s-search-result']"
      );
      const products: any[] = [];

      items.forEach((item, index) => {
        if (index >= 20) return; // Limit to first 20 products

        try {
          // Get title - try multiple selectors
          const titleElement =
            item.querySelector("h2 a span") ||
            item.querySelector("h2 span") ||
            item.querySelector("a h2");

          // Get price - try multiple selectors
          const priceElement =
            item.querySelector(".a-price-whole") ||
            item.querySelector(".a-price .a-offscreen") ||
            item.querySelector(".a-price-symbol + span") ||
            item.querySelector(".a-color-price");

          // Get rating - try multiple selectors
          const ratingElement =
            item.querySelector(".a-icon-star-small span") ||
            item.querySelector("span.a-icon-star span") ||
            item.querySelector("[aria-label*='star']") ||
            item.querySelector(".a-icon-star-small");

          // Get review count - try multiple selectors
          const reviewCountElement =
            item.querySelector("span.a-size-base.s-color-state") ||
            item.querySelector("a[href*='customerReviews']") ||
            item.querySelector("span[aria-label*='rating']") ||
            item.querySelector(".a-size-base.a-color-secondary") ||
            item.querySelector("span.a-size-base");

          // Get actual customer reviews - Amazon search pages don't show full reviews
          // Reviews are typically only available on individual product pages
          const topReviews: string[] = ["Reviews available on product page"];

          // Alternative: Try to find any review highlights/snippets if they exist
          const reviewHighlights = item.querySelectorAll(
            ".a-size-base.a-color-secondary, .a-row.a-size-base.a-color-secondary"
          );

          reviewHighlights.forEach((highlight) => {
            const text = highlight.textContent?.trim();
            // Only include if it looks like actual review content (not metadata)
            if (text &&
                text.length > 20 &&
                !text.includes("bought in past month") &&
                !text.includes("delivery") &&
                !text.includes("Ships to") &&
                !text.includes("More Buying Choices") &&
                !text.includes("featured offers") &&
                !text.includes("INR") &&
                !text.includes("out of 5") &&
                !text.includes("left in stock")) {
              topReviews.push(text);
            }
          });

          if (titleElement) {
            const title = titleElement.textContent?.trim() || "N/A";
            const price = priceElement?.textContent?.trim() || "N/A";
            const rating = ratingElement?.textContent?.trim() || "No rating";
            const reviewCount = reviewCountElement?.textContent?.trim() || "No reviews";

            products.push({
              name: title,
              price: price,
              rating: rating,
              reviewCount: reviewCount,
              topReviews: topReviews.length > 0 ? topReviews.slice(0, 5) : ["No reviews found"],
            });
          }
        } catch (error) {
          console.error("Error parsing product:", error);
        }
      });

      return products;
    });
    try {
      fs.writeFileSync("data.json", JSON.stringify(results, null, 2));
      console.log("saved succesfull");
    } catch (error) {
      console.log("not able the to save", error);
    }
    return results;
  } finally {
    await browser.close();
  }
}

