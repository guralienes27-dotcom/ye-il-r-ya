"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CartDrawer() {
  const router = useRouter();
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    increment,
    decrement,
    totalPrice,
    currency,
  } = useCart();

const handleCheckout = () => {
  console.log("CHECKOUT BUTONUNA BASILDI");
  router.push("/checkout");
};

  return (
    <>
      <div
  aria-hidden="true"
  onClick={closeCart}
  className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
    isOpen
      ? "pointer-events-auto opacity-100"
      : "pointer-events-none opacity-0"
  }`}
/>

       <aside
  role="dialog"
  aria-modal="true"
  aria-label="Alışveriş sepeti"
  aria-hidden={!isOpen}
  className={`fixed inset-0 z-[70] flex h-[100dvh] w-full flex-col overflow-hidden shadow-soft transition-transform duration-300 ease-out ${
    isOpen ? "translate-x-0" : "translate-x-full"
  }`}
  style={{
    backgroundColor: "#0e4b3c",
  }}
>
        <div className="flex items-center justify-between border-b border-cream/10 px-6 py-5">
          <h2 className="font-display text-xl font-semibold text-cream">Sepetim</h2>
          <button
            type="button"
            aria-label="Sepeti kapat"
            onClick={closeCart}
            className="rounded-full p-2 text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream/10">
              <ShoppingBag className="h-7 w-7 text-gold-light" />
            </span>
            <p className="font-display text-lg font-semibold text-cream">Sepetiniz boş</p>
            <p className="font-body text-sm text-cream/60">
              İmza tatlılarımızı keşfedin ve sepetinize ekleyin.
            </p>
            <button
              type="button"
              onClick={closeCart}
              className="mt-2 rounded-full bg-gold-sheen px-6 py-2.5 font-body text-sm font-bold text-emerald-dark shadow-gold transition-transform hover:scale-105"
            >
              Alışverişe Başla
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex animate-fade-up gap-4 rounded-2xl bg-cream/5 p-3 transition-colors duration-300 hover:bg-cream/10"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-body text-sm font-semibold text-cream">{item.name}</p>
                      <button
                        type="button"
                        aria-label={`${item.name} ürününü sepetten çıkar`}
                        onClick={() => removeItem(item.id)}
                        className="shrink-0 rounded-full p-1 text-cream/50 transition-colors hover:text-gold-light"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-0.5 font-display text-sm font-bold text-gold-light">
                      {item.currency}
                      {item.price}
                    </p>
                    <div className="mt-auto flex items-center gap-2 pt-2">
                      <div className="flex items-center rounded-full border border-cream/15">
                        <button
                          type="button"
                          aria-label="Azalt"
                          onClick={() => decrement(item.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-cream transition-colors hover:bg-cream/10"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center font-body text-xs font-bold text-cream">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Artır"
                          onClick={() => increment(item.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-cream transition-colors hover:bg-cream/10"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="ml-auto font-body text-xs text-cream/50">
                        {item.currency}
                        {item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-cream/10 px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-body text-sm text-cream/70">Toplam</span>
                <span className="font-display text-2xl font-bold text-cream">
                  {currency}
                  {totalPrice}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full rounded-full bg-gold-sheen bg-[length:200%_auto] px-6 py-4 font-body text-sm font-bold text-emerald-dark shadow-gold transition-all duration-500 hover:bg-right hover:shadow-lg active:scale-95"
              >
                Siparişi Tamamla
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}