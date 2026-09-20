import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { jwtVerify } from "jose";

async function verifyAdmin(request: NextRequest) {
  const token = request.cookies.get("admin_session")?.value;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!token || !secret) {
    return false;
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );

    return payload.role === "admin";
  } catch {
    return false;
  }
}

async function getConnection() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
}

export async function GET(request: NextRequest) {
  if (!(await verifyAdmin(request))) {
    return NextResponse.json(
      { error: "Yetkisiz erişim." },
      { status: 401 }
    );
  }

  let connection: mysql.Connection | undefined;

  try {
    connection = await getConnection();

    const [rows] = await connection.execute(`
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
        active,
        created_at,
        updated_at
      FROM products
      ORDER BY created_at ASC
    `);

    return NextResponse.json({
      success: true,
      products: rows,
    });
  } catch (error) {
    console.error("Ürünleri listeleme hatası:", error);

    return NextResponse.json(
      { error: "Ürünler alınamadı." },
      { status: 500 }
    );
  } finally {
    await connection?.end();
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifyAdmin(request))) {
    return NextResponse.json(
      { error: "Yetkisiz erişim." },
      { status: 401 }
    );
  }

  let connection: mysql.Connection | undefined;

  try {
    const body = await request.json();

    const {
      id,
      slug,
      name,
      category,
      price,
      currency,
      shortDescription,
      description,
      image,
      featured,
      rating,
      reviews,
      active,
    } = body;

    if (
      typeof id !== "string" ||
      typeof slug !== "string" ||
      typeof name !== "string" ||
      typeof category !== "string" ||
      typeof price !== "number" ||
      !Number.isFinite(price) ||
      typeof currency !== "string" ||
      typeof shortDescription !== "string" ||
      typeof description !== "string" ||
      typeof image !== "string"
    ) {
      return NextResponse.json(
        { error: "Geçersiz ürün bilgileri." },
        { status: 400 }
      );
    }

    connection = await getConnection();

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
      `,
      [
        id,
        slug,
        name,
        category,
        price,
        currency,
        shortDescription,
        description,
        image,
        Boolean(featured),
        Number(rating ?? 5),
        Number(reviews ?? 0),
        active !== false,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Ürün oluşturuldu.",
    });
  } catch (error) {
    console.error("Ürün oluşturma hatası:", error);

    return NextResponse.json(
      { error: "Ürün oluşturulamadı." },
      { status: 500 }
    );
  } finally {
    await connection?.end();
  }
}