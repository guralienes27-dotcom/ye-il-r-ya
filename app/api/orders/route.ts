import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function POST(request: Request) {
  let connection;

  try {
    const body = await request.json();

    const {
      orderNumber,
      customer,
      items,
      totalPrice,
      currency,
      status,
    } = body;

    if (
      !orderNumber ||
      !customer?.name ||
      !customer?.phone ||
      !customer?.email ||
      !customer?.address ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        { error: "Eksik sipariş bilgileri." },
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

    await connection.execute(
      `INSERT INTO orders
      (
        order_number,
        customer_name,
        customer_phone,
        customer_email,
        customer_address,
        items,
        total_price,
        currency,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderNumber,
        customer.name,
        customer.phone,
        customer.email,
        customer.address,
        JSON.stringify(items),
        totalPrice,
        currency || "₺",
        status || "pending",
      ]
    );

    return NextResponse.json(
      {
        success: true,
        orderNumber,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Sipariş kaydetme hatası:", error);

    return NextResponse.json(
      { error: "Sipariş kaydedilemedi." },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}