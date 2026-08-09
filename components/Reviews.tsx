import { Star, Quote } from "lucide-react";
import { reviews } from "@/lib/data";

export default function Reviews() {
  return (
    <section className="relative overflow-hidden bg-emerald-radial py-24 lg:py-32">
      <div className="grain absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="font-body text-xs font-bold uppercase tracking-[0.3em] text-gold-light">
            Müşteri Yorumları
          </span>
          <h2 className="mt-4 text-balance font-display text-4xl font-semibold text-cream sm:text-5xl">
            Damaklarda Bıraktığımız İz
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review) => (
            <figure
              key={review.id}
              className="glass flex flex-col rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1.5"
            >
              <Quote className="h-7 w-7 text-gold-light/70" />
              <blockquote className="mt-4 flex-1 font-accent text-lg italic leading-relaxed text-cream/85">
                “{review.quote}”
              </blockquote>

              <div className="mt-6 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < review.rating ? "fill-gold-light text-gold-light" : "text-cream/15"
                    }`}
                  />
                ))}
              </div>

              <figcaption className="mt-4 flex items-center gap-3 border-t border-cream/10 pt-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-sheen font-display text-sm font-bold text-emerald-dark">
                  {review.initials}
                </span>
                <span>
                  <span className="block font-body text-sm font-semibold text-cream">
                    {review.name}
                  </span>
                  <span className="block font-body text-xs text-cream/50">
                    {review.location}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
