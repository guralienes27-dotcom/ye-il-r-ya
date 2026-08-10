"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Star, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { useCart } from "@/lib/cart-context";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/hooks/useFavorites";
import { useRouter } from "next/navigation";

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
  const { user, profile } = useAuth();
  const router = useRouter();
  const { addItem } = useCart();

  const { isFavorite, toggleFavorite, isPending } = useFavorites();

  const favorited = isFavorite(product.id);
  const favoritePending = isPending(product.id);

  const [isAdding, setIsAdding] = useState(false);

  const hasDiscount =
    typeof oldPrice === "number" && oldPrice > product.price;

  const discountPct = hasDiscount
    ? Math.round(((oldPrice! - product.price) / oldPrice!) * 100)
    : 0;

  const handleAddToCart = () => {
    if (isAdding) return;

    setIsAdding(true);

    addItem(product, 1);

    setTimeout(() => {
      setIsAdding(false);
    }, 300);
  };

  const handleFavorite = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (favoritePending) return;

    try {
      const userRef = doc(db, "users", user.uid);

      if (favorited) {
        await updateDoc(userRef, {
          favorites: arrayRemove(product.id),
        });
      } else {
        await updateDoc(userRef, {
          favorites: arrayUnion(product.id),
        });
      }

      await toggleFavorite(product.id);
    } catch (error) {
      console.error("Favori işlemi başarısız:", error);
    }
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-cream shadow-card transition-transform duration-300 hover:-translate-y-1">
      {/* Ürün görseli */}
      <div className="relative h-72 w-full shrink-0 overflow-hidden sm:h-80">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-dark/30 via-transparent to-transparent" />

        {/* Rozetler */}
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

        {/* Favori */}
        <button
          type="button"
          aria-label={
            favorited ? "Favorilerden çıkar" : "Favorilere ekle"
          }
          aria-pressed={favorited}
          disabled={favoritePending}
          onClick={handleFavorite}
          className="absolute right-4 top-4 z-30 flex h-10 w-10 touch-manipulation items-center justify-center rounded-full bg-cream/90 shadow-card backdrop-blur transition-transform duration-300 hover:scale-110 disabled:opacity-50"
        >
          <Heart
            className={`h-4 w-4 transition-colors duration-300 ${
              favorited
                ? "fill-gold text-gold"
                : "text-emerald"
            }`}
          />
        </button>

        {/* Stok */}
        {typeof stockLeft === "number" && stockLeft <= 5 && (
          <span className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 rounded-full bg-cream/95 px-3 py-1 font-body text-[11px] font-bold text-gold-dark shadow-card">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-dark" />
            Stokta Son {stockLeft} Ürün
          </span>
        )}
      </div>

      {/* Ürün bilgileri */}
      <div className="relative flex flex-1 flex-col p-6 sm:p-7">
        {/* Puan */}
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

        {/* İsim */}
        <h3 className="font-display text-xl font-semibold text-emerald-dark sm:text-2xl">
          {product.name}
        </h3>

        {/* Açıklama */}
        <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-ink/60">
          {product.description}
        </p>

        {/* Fiyat + Sepet */}
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

          {/* Sepete Ekle */}
          <button
            type="button"
            aria-label={`${product.name} ürününü sepete ekle`}
            disabled={isAdding}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddToCart();
            }}
            className="relative z-30 inline-flex min-h-11 touch-manipulation items-center justify-center gap-2 rounded-full bg-gold-sheen px-5 py-2.5 font-body text-sm font-bold text-emerald-dark shadow-gold transition-transform duration-200 hover:scale-105 active:scale-95 disabled:cursor-wait disabled:opacity-70"
          >
            <ShoppingBag className="h-4 w-4" />

            {isAdding ? "Ekleniyor..." : "Sepete Ekle"}
          </button>
        </div>
      </div>
    </article>
  );
}