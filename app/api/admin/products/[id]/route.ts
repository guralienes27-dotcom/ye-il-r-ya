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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdmin(request))) {
    return NextResponse.json(
      { error: "Yetkisiz erişim." },
      { status: 401 }
    );
  }

  let connection: mysql.Connection | undefined;

  try {
    const { id } = await params;
    const body = await request.json();

    const {
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

    const [result] = await connection.execute(
      `
      UPDATE products
      SET
        slug = ?,
        name = ?,
        category = ?,
        price = ?,
        currency = ?,
        short_description = ?,
        description = ?,
        image = ?,
        featured = ?,
        rating = ?,
        reviews = ?,
        active = ?
      WHERE id = ?
      `,
      [
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
        Boolean(active),
        id,
      ]
    );

    if ("affectedRows" in result && result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Ürün bulunamadı." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Ürün güncellendi.",
    });
  } catch (error) {
    console.error("Ürün güncelleme hatası:", error);

    return NextResponse.json(
      { error: "Ürün güncellenemedi." },
      { status: 500 }
    );
  } finally {
    await connection?.end();
  }
}