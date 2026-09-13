import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request: Request) {
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

    // Temel kontroller
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
        { error: "Eksik sipariş bilgisi." },
        { status: 400 }
      );
    }

    const [result] = await db.execute(
      `
        INSERT INTO orders
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
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        orderNumber,
        customer.name,
        customer.phone,
        customer.email,
        customer.address,
        JSON.stringify(items),
        totalPrice,
        currency,
        status || "pending",
      ]
    );

    return NextResponse.json(
      {
        success: true,
        orderNumber,
        result,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Sipariş oluşturma hatası:", error);

    return NextResponse.json(
      { error: "Sipariş oluşturulamadı." },
      { status: 500 }
    );
  }
} 