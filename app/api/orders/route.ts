import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { randomUUID } from "crypto";
import { getProductsByIds } from "@/lib/products-db";

type IncomingItem = {
  id?: unknown;
  quantity?: unknown;
};

export async function POST(request: Request) {
  let connection: mysql.Connection | undefined;

  try {
    const body = await request.json();

    const customer = body?.customer;
    const incomingItems: IncomingItem[] = body?.items;

    // Müşteri bilgilerini kontrol et
    if (
      typeof customer?.name !== "string" ||
      typeof customer?.phone !== "string" ||
      typeof customer?.email !== "string" ||
      typeof customer?.address !== "string"
    ) {
      return NextResponse.json(
        { error: "Müşteri bilgileri eksik veya geçersiz." },
        { status: 400 }
      );
    }

    const name = customer.name.trim();
    const phone = customer.phone.trim();
    const email = customer.email.trim();
    const address = customer.address.trim();

    if (
      name.length < 2 ||
      name.length > 150 ||
      phone.length < 5 ||
      phone.length > 50 ||
      email.length < 5 ||
      email.length > 190 ||
      address.length < 5 ||
      address.length > 2000
    ) {
      return NextResponse.json(
        { error: "Müşteri bilgileri geçersiz." },
        { status: 400 }
      );
    }

     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Geçerli bir e-posta adresi girin." },
        { status: 400 }
      );
    }

    if (!Array.isArray(incomingItems) || incomingItems.length === 0) {
      return NextResponse.json(
        { error: "Sepet boş." },
        { status: 400 }
      );
    }

    if (incomingItems.length > 50) {
      return NextResponse.json(
        { error: "Sepette çok fazla ürün var." },
        { status: 400 }
      );
    }

    // Önce gelen ürün ID ve adetlerini doğrula.
    const cleanItems = incomingItems.map((item) => {
      if (
        typeof item.id !== "string" ||
        typeof item.quantity !== "number" ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 20
      ) {
        throw new Error("INVALID_ITEM");
      }

      return {
        id: item.id,
        quantity: item.quantity,
      };
    });

    // Tekrarlanan ID'leri kaldır.
    const productIds = [...new Set(cleanItems.map((item) => item.id))];

    // Ürünleri ve GERÇEK fiyatları MySQL'den getir.
    const databaseProducts = await getProductsByIds(productIds);

    // İstemciden fiyat almıyoruz.
    // Her ürünü MySQL'deki güncel ürünle eşleştiriyoruz.
    const verifiedItems = cleanItems.map((incomingItem) => {
      const product = databaseProducts.find(
        (item) => item.id === incomingItem.id
      );

      if (!product) {
        throw new Error("PRODUCT_NOT_FOUND");
      }

      const price = Number(product.price);

      return {
        id: product.id,
        name: product.name,
        price,
        currency: product.currency,
        image: product.image,
        quantity: incomingItem.quantity,
        subtotal: price * incomingItem.quantity,
      };
    });

    // Toplam fiyat tamamen sunucuda ve DB fiyatlarıyla hesaplanır.
    const totalPrice = verifiedItems.reduce(
      (total, item) => total + item.subtotal,
      0
    );

     const orderNumber =
      "YR-" +
      Date.now().toString(36).toUpperCase() +
      "-" +
      randomUUID().slice(0, 6).toUpperCase();

     const status = "pending";

    // Sepet tek para birimi kullanıyor.
    const currency = verifiedItems[0]?.currency ?? "₺";

    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    await connection.execute(
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
        name,
        phone,
        email,
        address,
        JSON.stringify(verifiedItems),
        totalPrice,
        currency,
        status,
      ]
    );

    return NextResponse.json(
      {
        success: true,
        orderNumber,
        totalPrice,
        currency,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "INVALID_ITEM") {
        return NextResponse.json(
          { error: "Ürün adedi veya ürün bilgisi geçersiz." },
          { status: 400 }
        );
      }

      if (error.message === "PRODUCT_NOT_FOUND") {
        return NextResponse.json(
          { error: "Sepette artık mevcut olmayan bir ürün var." },
          { status: 400 }
        );
      }
    }

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