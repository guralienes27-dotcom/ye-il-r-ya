
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("admin_session")?.value;
    const secret = process.env.ADMIN_SESSION_SECRET;

    if (!token || !secret) {
      return NextResponse.json(
        { error: "Yetkisiz erişim." },
        { status: 401 }
      );
    }

    await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Fotoğraf seçilmedi." },
        { status: 400 }
      );
    }

    if (file.size === 0 || file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Fotoğraf en fazla 5 MB olabilir." },
        { status: 400 }
      );
    }

    const bytes = Buffer.from(await file.arrayBuffer());

    // Dosyanın gerçek biçimini kontrol et.
    let extension: string | null = null;

    if (
      bytes.subarray(0, 3).equals(
        Buffer.from([0xff, 0xd8, 0xff])
      )
    ) {
      extension = "jpg";
    } else if (
      bytes.subarray(0, 8).equals(
        Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
      )
    ) {
      extension = "png";
    } else if (
      bytes.toString("ascii", 0, 4) === "RIFF" &&
      bytes.toString("ascii", 8, 12) === "WEBP"
    ) {
      extension = "webp";
    }

    if (!extension) {
      return NextResponse.json(
        { error: "Yalnızca JPG, PNG ve WebP yüklenebilir." },
        { status: 400 }
      );
    }

    const filename = `${randomUUID()}.${extension}`;

    const uploadDir =
      process.env.PRODUCT_UPLOAD_DIR ||
      path.join(process.cwd(), "public", "uploads", "products");

    await mkdir(uploadDir, { recursive: true });

    await writeFile(path.join(uploadDir, filename), bytes, {
      flag: "wx",
    });

    return NextResponse.json({
      image: `/uploads/products/${filename}`,
    });
  } catch (error) {
    console.error("Fotoğraf yükleme hatası:", error);

    return NextResponse.json(
      { error: "Fotoğraf yüklenemedi." },
      { status: 500 }
    );
  }
}
