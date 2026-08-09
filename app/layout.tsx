import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Playfair_Display, Manrope, Cormorant_Garamond } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css"; 

const displayFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const accentFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["italic", "normal"],
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yeşil Rüya Cennet Çamuru | Prestij Tatlı Butiği",
  description:
    "El yapımı, Antep fıstıklı cennet çamuru ve premium tatlı koleksiyonu. Her gün taze, orijinal reçeteyle hazırlanır, aynı gün teslimat.",
  keywords: [
    "cennet çamuru",
    "Antep fıstığı tatlı",
    "premium tatlı",
    "Yeşil Rüya",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${displayFont.variable} ${bodyFont.variable} ${accentFont.variable}`}
    >
      <body className="bg-cream text-ink antialiased">
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
} 