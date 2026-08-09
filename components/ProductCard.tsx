"use client";
 
import Image from "next/image";
import { Heart, Star, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { useCart } from "@/lib/cart-context";
import { useFavorites } from "@/hooks/useFavorites";

export interface ProductCardExtras {
  oldPrice?: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  stockLeft?: number;
}

export default function ProductCard({
  product,
  oldPrice,
  isBestSeller,
  isNew,
  stockLeft,
 }: { product: Product } & ProductCardExtras) {
  const { addItem } = useCart();

  const {
    isFavorite,
    toggleFavorite,
    isPending,
  } = useFavorites();

  const favorited = isFavorite(product.id);
  const favoritePending = isPending(product.id);

  const hasDiscount =
    typeof oldPrice === "number" && oldPrice > product.price;

  const discountPct = hasDiscount
    ? Math.round(((oldPrice! - product.price) / oldPrice!) * 100)
    : 0;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-soft">
      {/* Hover glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1 -z-10 rounded-[2rem] bg-gold/0 blur-xl transition-all duration-500 group-hover:bg-gold/10"
      />

      {/* Image */}
      <div className="relative h-72 w-full shrink-0 overflow-hidden sm:h-80">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-emerald-dark/30 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute left-4 top-4 z-20 flex flex-col gap-2">
          {isBestSeller && (
            <span className="rounded-full bg-gold-sheen px-3 py-1 font-body text-[11px] font-bold tracking-wide text-emerald-dark shadow-gold">
              En Çok Satan
            </span>
          )}

          {isNew && (
            <span className="rounded-full bg-emerald px-3 py-1 font-body text-[11px] font-bold tracking-wide text-cream shadow-card">
              Yeni
            </span>
          )}

          {!isBestSeller && !isNew && product.badge && (
            <span className="rounded-full bg-gold-sheen px-3 py-1 font-body text-[11px] font-bold tracking-wide text-emerald-dark shadow-gold">
              {product.badge}
            </span>
          )}
        </div>

        {/* Favorite */}
        <button
          type="button"
          aria-label={
            favorited
              ? "Favorilerden çıkar"
              : "Favorilere ekle"
          }
          aria-pressed={favorited}
          disabled={favoritePending}
          onClick={() => toggleFavorite(product.id)}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 shadow-card backdrop-blur transition-transform duration-300 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Heart
            className={`h-4 w-4 transition-colors duration-300 ${
              favorited
                ? "fill-gold text-gold"
                : "text-emerald"
            }`}
          />
        </button>

        {/* Stock */}
        {typeof stockLeft === "number" && stockLeft <= 5 && (
          <span className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 rounded-full bg-cream/95 px-3 py-1 font-body text-[11px] font-bold text-gold-dark shadow-card">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-dark" />
            Stokta Son {stockLeft} Ürün
          </span>
        )}
      </div>

      {/* Content */}
      <div className="relative flex flex-1 flex-col p-6 sm:p-7">
        {/* Rating */}
        <div className="mb-1 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${
                i < product.rating
                  ? "fill-gold text-gold"
                  : "text-emerald/15"
              }`}
            />
          ))}
        </div>

        {/* Product name */}
        <h3 className="font-display text-xl font-semibold text-emerald-dark sm:text-2xl">
          {product.name}
        </h3>

        {/* Description */}
        <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-ink/60">
          {product.description}
        </p>

        {/* Price + cart */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-emerald-dark">
              {product.currency}
              {product.price}
            </span>

            {hasDiscount && (
              <>
                <span className="font-body text-sm text-ink/40 line-through">
                  {product.currency}
                  {oldPrice}
                </span>

                <span className="font-body text-xs font-bold text-gold-dark">
                  %{discountPct}
                </span>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => addItem(product)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-sheen bg-[length:200%_auto] px-5 py-2.5 font-body text-sm font-bold text-emerald-dark shadow-gold transition-all duration-500 hover:bg-right hover:shadow-lg active:scale-95"
          >
            <ShoppingBag className="h-4 w-4" />
            Sepete Ekle
          </button>
        </div>
      </div>
    </article>
  );
} 