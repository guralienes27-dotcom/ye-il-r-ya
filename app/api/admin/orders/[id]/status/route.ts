import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { jwtVerify } from "jose";

const allowedStatuses = [
  "pending",
  "preparing",
  "completed",
  "cancelled",
] as const;

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

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdmin(request))) {
    return NextResponse.json(
      { error: "Yetkisiz erişim." },
      { status: 401 }
    );
  }

  let connection;

  try {
    const { id } = await context.params;
    const orderId = Number(id);

    if (!Number.isInteger(orderId) || orderId <= 0) {
      return NextResponse.json(
        { error: "Geçersiz sipariş." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const status = body?.status;

    if (
      typeof status !== "string" ||
      !allowedStatuses.includes(
        status as (typeof allowedStatuses)[number]
      )
    ) {
      return NextResponse.json(
        { error: "Geçersiz sipariş durumu." },
        { status: 400 }
      );
    }

    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [result] = await connection.execute(
      `UPDATE orders
       SET status = ?
       WHERE id = ?`,
      [status, orderId]
    );

    const updateResult = result as {
      affectedRows: number;
    };

    if (updateResult.affectedRows === 0) {
      return NextResponse.json(
        { error: "Sipariş bulunamadı." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      status,
    });
  } catch (error) {
    console.error("Sipariş durumu güncelleme hatası:", error);

    return NextResponse.json(
      { error: "Sipariş durumu güncellenemedi." },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}