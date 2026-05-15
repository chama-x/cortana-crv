export async function fetchCategoryImage(category) {
  const res = await fetch(`/api/photos?query=${encodeURIComponent(category)}&orientation=landscape`);
  if (!res.ok) {
    if (res.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later or provide a production API key.");
    }
    throw new Error(`Failed to fetch image for ${category}`);
  }
  return res.json();
}

export async function fetchSessionImages(categories) {
  // Parallel fetch all 4 categories
  return Promise.all(categories.map(fetchCategoryImage));
}

export function preloadImage(url) {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      resolve();
      return;
    }
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = url;
  });
}
