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

export async function GET(request: NextRequest) {
  if (!(await verifyAdmin(request))) {
    return NextResponse.json(
      { error: "Yetkisiz erişim." },
      { status: 401 }
    );
  }

  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [rows] = await connection.execute(`
      SELECT
        id,
        order_number,
        customer_name,
        customer_phone,
        customer_email,
        customer_address,
        items,
        total_price,
        currency,
        status,
        created_at
      FROM orders
      ORDER BY created_at DESC
      LIMIT 200
    `);

    return NextResponse.json({
      success: true,
      orders: rows,
    });
  } catch (error) {
    console.error("Admin sipariş listeleme hatası:", error);

    return NextResponse.json(
      { error: "Siparişler alınamadı." },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}