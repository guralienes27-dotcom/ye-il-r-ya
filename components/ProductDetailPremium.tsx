"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ShoppingBag, Zap, Minus, Plus, Truck } from "lucide-react";
import type { StoreProduct } from "@/lib/data";
import { useCart } from "@/lib/cart-context";

const tabs = [
  { id: "description", label: "Ürün Açıklaması" },
  { id: "ingredients", label: "İçindekiler" },
  { id: "storage", label: "Saklama Koşulları" },
  { id: "delivery", label: "Teslimat Bilgileri" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function ProductDetailPremium({ product }: { product: StoreProduct }) {
  // Gallery is built from the single source image today but reads as an
  // array so real multi-image products drop in without further changes.
  const gallery = [
    product.image,
    `${product.image}&sat=-20`,
    `${product.image}&sat=20`,
    `${product.image}&exp=-8`,
  ];

  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<TabId>("description");
  const { addItem, openCart } = useCart();

  return (
    <section className="mx-auto max-w-7xl px-6 pb-20 pt-32 lg:px-10 lg:pt-40">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Gallery */}
        <div>
          <div className="group relative aspect-square w-full overflow-hidden rounded-[2rem] shadow-soft ring-1 ring-emerald/5">
            <Image
              src={gallery[activeImage]}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          </div>

          <div className="mt-4 grid grid-cols-4 gap-3">
            {gallery.map((src, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Görsel ${i + 1}`}
                onClick={() => setActiveImage(i)}
                className={`relative aspect-square overflow-hidden rounded-xl ring-2 transition-all duration-300 ${
                  activeImage === i ? "ring-gold" : "ring-transparent hover:ring-gold/40"
                }`}
              >
                <Image src={src} alt="" fill sizes="120px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <span className="inline-block rounded-full bg-cream-dark px-3 py-1 font-body text-xs font-bold uppercase tracking-wide text-emerald-dark">
            {product.category}
          </span>

          <h1 className="mt-3 text-balance font-display text-3xl font-semibold text-emerald-dark sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < product.rating ? "fill-gold text-gold" : "text-emerald/15"
                  }`}
                />
              ))}
            </div>
            <span className="font-body text-sm text-ink/50">
              ({product.reviews} değerlendirme)
            </span>
          </div>

          <div className="mt-6">
            <span className="font-display text-4xl font-bold text-emerald-dark">
              {product.currency}
              {product.price}
            </span>
          </div>

          <p className="mt-5 max-w-lg font-body text-sm leading-relaxed text-ink/60">
            {product.shortDescription}
          </p>

          <span className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-cream-dark px-3 py-1.5 font-body text-xs font-semibold text-emerald-dark">
            <Truck className="h-3.5 w-3.5 text-gold-dark" />
            Aynı Gün Kargo
          </span>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center rounded-full border border-emerald/15 bg-white/60">
              <button
                type="button"
                aria-label="Azalt"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-11 w-11 items-center justify-center rounded-full text-emerald-dark transition-colors hover:bg-emerald/5"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-body text-sm font-bold text-emerald-dark">
                {qty}
              </span>
              <button
                type="button"
                aria-label="Artır"
                onClick={() => setQty((q) => Math.min(10, q + 1))}
                className="flex h-11 w-11 items-center justify-center rounded-full text-emerald-dark transition-colors hover:bg-emerald/5"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => addItem(product, qty)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold-sheen bg-[length:200%_auto] px-8 py-4 font-body text-sm font-bold text-emerald-dark shadow-gold transition-all duration-500 hover:bg-right hover:shadow-lg active:scale-95"
            >
              <ShoppingBag className="h-4 w-4" />
              Sepete Ekle
            </button>
            <button
              type="button"
              onClick={() => {
                addItem(product, qty);
                openCart();
              }}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-emerald px-8 py-4 font-body text-sm font-bold text-cream shadow-card transition-all duration-300 hover:bg-emerald-dark"
            >
              <Zap className="h-4 w-4" />
              Hemen Satın Al
            </button>
          </div>
        </div>
      </div>

      {/* Detail tabs */}
      <div className="mt-20">
        <div className="flex flex-wrap gap-2 border-b border-emerald/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-3 font-body text-sm font-semibold transition-colors duration-300 ${
                activeTab === tab.id ? "text-emerald-dark" : "text-ink/45 hover:text-emerald-dark"
              }`}
            >
              {tab.label}
              <span
                className={`absolute -bottom-px left-0 h-0.5 w-full rounded-full bg-gold-sheen transition-transform duration-300 ${
                  activeTab === tab.id ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="max-w-2xl py-8 font-body text-sm leading-relaxed text-ink/65">
          {activeTab === "description" && (
            <p>
              {product.description} El yapımı üretim sürecimizde her parti,
              ustalarımızın gözetiminde küçük miktarlarda hazırlanır ve aynı
              gün taze olarak paketlenir.
            </p>
          )}

          {activeTab === "ingredients" && (
            <ul className="list-disc space-y-2 pl-5">
              <li>Gerçek Antep fıstığı</li>
              <li>Tereyağı</li>
              <li>Kadayıf teli / özel hamur (ürüne göre)</li>
              <li>Şeker ve şerbet</li>
              <li>Süt ve krema</li>
            </ul>
          )}

          {activeTab === "storage" && (
            <p>
              Teslimat sonrası 2–6°C arasında buzdolabında saklayınız ve 2–3
              gün içinde tüketiniz. Doğrudan güneş ışığından ve ısı
              kaynaklarından uzak tutunuz. Dondurulması önerilmez.
            </p>
          )}

          {activeTab === "delivery" && (
            <p>
              Saat 14:00&apos;e kadar verilen siparişler aynı gün, soğuk zincir
              korunarak özel ısı yalıtımlı kutularda kargoya teslim edilir.
              Türkiye geneline 1–2 iş günü içinde ulaştırılır.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
