import { db } from "../db/index";
import { categories } from "../db/schema";

const CategoryName = [
  "Film & Animation",
  "Autos & Vehicles",
  "Music",
  "Pets & Animals",
  "Sports",
  "Short Movies",
  "Travel & Events",
  "Gaming",
  "Videoblogging",
  "People & Blogs",
  "Comedy",
  "Entertainment",
  "Horror",
  "Sci-Fi/Fantasy",
  "Thriller",
  "Shorts",
  "Shows",
  "Trailers",
];

async function Main() {
  try {
    const values = CategoryName.map((category) => ({
      name: category,
      description: `Videos related to category like ${category.toLowerCase()}`,
    }));

    console.log("Values ready:", !!JSON.stringify(values, null, 2));

    await db.insert(categories).values(values);
    console.log("Seeded successfully ✅");
  } catch (error) {
    console.error("Seeding Error:", error);
    throw error; // better than process.exit() in Bun
  }
}

Main();
