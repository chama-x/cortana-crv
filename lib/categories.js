export const CATEGORIES = [
  "Ocean Waves", "Desert Dunes", "Dense Forest", "Volcanic Eruption",
  "Outer Space Galaxy", "Microscopic Cells", "City Skyline", "Ancient Ruins",
  "Industrial Machinery", "Macro Insect", "Close-up Eye", "Geometric Pattern",
  "Musical Instrument", "Abstract Painting", "Lightning Storm", "Snowy Mountain",
  "Underwater Coral", "Fire Flames", "Cloud Formations", "Wild Animal",
  "Vintage Vehicle", "Modern Architecture", "Classic Sculpture", "Text Typography",
  "Fresh Fruit", "Metallic Texture", "Glass Reflection", "Wooden Structure",
  "Fabric Weave", "Flowing River", "Cave Interior", "Bridge Structure",
  "Crowd of People", "Empty Room", "Circuit Board", "Astronomical Telescope",
  "Medical Equipment", "Agricultural Field", "Aviation Aircraft", "Nautical Ship",
  "Railway Tracks", "Sporting Event", "Carnival Ride", "Library Books",
  "Cemetery Gravestones", "Bicycle Wheel", "Clock Face", "Jewelry Gems",
  "Baking Bread", "Coffee Beans"
];

export function pickRandomCategories(count = 4) {
  const shuffled = [...CATEGORIES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
