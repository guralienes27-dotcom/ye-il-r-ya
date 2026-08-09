import { products } from "@/lib/data";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  return (
    <section id="products" className="relative bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="font-body text-xs font-bold uppercase tracking-[0.3em] text-gold-dark">
            Öne Çıkan Seçki
          </span>
          <h2 className="mt-4 text-balance font-display text-4xl font-semibold text-emerald-dark sm:text-5xl">
            İmza Tatlılarımız
          </h2>
          <p className="mt-5 font-body text-base leading-relaxed text-ink/60">
            Her biri elde, taze ve sınırlı sayıda üretilen; Antep fıstığının
            en asil hâliyle buluştuğu seçki.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
