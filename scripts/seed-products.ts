import mysql from "mysql2/promise";
import { products } from "../lib/data";

async function main() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    for (const product of products) {
      await connection.execute(
        `
        INSERT INTO products (
          id,
          slug,
          name,
          category,
          price,
          currency,
          short_description,
          description,
          image,
          featured,
          rating,
          reviews,
          active
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          slug = VALUES(slug),
          name = VALUES(name),
          category = VALUES(category),
          price = VALUES(price),
          currency = VALUES(currency),
          short_description = VALUES(short_description),
          description = VALUES(description),
          image = VALUES(image),
          featured = VALUES(featured),
          rating = VALUES(rating),
          reviews = VALUES(reviews),
          active = VALUES(active)
        `,
        [
          product.id,
          product.slug,
          product.name,
          product.category,
          product.price,
          product.currency,
          product.shortDescription,
          product.description,
          product.image,
          product.featured,
          product.rating,
          product.reviews,
          true,
        ]
      );

      console.log(`Aktarıldı: ${product.name}`);
    }

    console.log(`\nToplam ${products.length} ürün aktarıldı.`);
  } finally {
    await connection.end();
  }
}

main().catch((error) => {
  console.error("Ürün aktarım hatası:", error);
  process.exit(1);
});