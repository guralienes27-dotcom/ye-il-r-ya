import mysql from "mysql2/promise";
import type { StoreProduct } from "@/lib/data";

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: string | number;
  currency: string;
  short_description: string;
  description: string;
  image: string;
  featured: number | boolean;
  rating: string | number;
  reviews: number;
  active: number | boolean;
};

async function getConnection() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
}

// DB'den gelen kategori gerçekten izin verilen kategorilerden mi kontrol eder.
function parseCategory(category: string): StoreProduct["category"] {
  const categories: StoreProduct["category"][] = [
    "Cennet Çamuru",
    "Künefe",
    "Kadayıf",
    "Katmer",
  ];

  if (!categories.includes(category as StoreProduct["category"])) {
    throw new Error(`Geçersiz ürün kategorisi: ${category}`);
  }

  return category as StoreProduct["category"];
}

// MySQL satırını sitenin kullandığı StoreProduct formatına çevirir.
function mapProduct(row: ProductRow): StoreProduct {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: parseCategory(row.category),
    price: Number(row.price),
    currency: row.currency,
    shortDescription: row.short_description,
    description: row.description,
    image: row.image,
    featured: Boolean(row.featured),
    rating: Number(row.rating),
    reviews: Number(row.reviews),
  };
}

// Aktif olan bütün ürünleri getirir.
export async function getProducts(): Promise<StoreProduct[]> {
  const connection = await getConnection();

  try {
    const [rows] = await connection.execute(
      `
      SELECT
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
      FROM products
      WHERE active = 1
      ORDER BY created_at ASC
      `
    );

    return (rows as ProductRow[]).map(mapProduct);
  } finally {
    await connection.end();
  }
}

// Slug'a göre tek ürün getirir.
export async function getProductBySlug(
  slug: string
): Promise<StoreProduct | null> {
  const connection = await getConnection();

  try {
    const [rows] = await connection.execute(
      `
      SELECT
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
      FROM products
      WHERE slug = ?
        AND active = 1
      LIMIT 1
      `,
      [slug]
    );

    const productRows = rows as ProductRow[];

    if (productRows.length === 0) {
      return null;
    }

    return mapProduct(productRows[0]);
  } finally {
    await connection.end();
  }
}

// Birden fazla ürün ID'sine göre ürünleri getirir.
// Bunu sipariş oluştururken güvenli fiyat hesaplamasında kullanacağız.
export async function getProductsByIds(
  ids: string[]
): Promise<StoreProduct[]> {
  if (ids.length === 0) {
    return [];
  }

  const connection = await getConnection();

  try {
    const placeholders = ids.map(() => "?").join(",");

    const [rows] = await connection.execute(
      `
      SELECT
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
      FROM products
      WHERE id IN (${placeholders})
        AND active = 1
      `,
      ids
    );

    return (rows as ProductRow[]).map(mapProduct);
  } finally {
    await connection.end();
  }
} 