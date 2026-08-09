import type { ElementType } from "react";
import { Leaf, ChefHat, Truck, ShieldCheck } from "lucide-react";
import { features } from "@/lib/data";
import type { FeatureItem } from "@/types";

const icons: Record<FeatureItem["icon"], ElementType> = {
  leaf: Leaf,
  recipe: ChefHat,
  delivery: Truck,
  secure: ShieldCheck,
};

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-cream-dark py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="font-body text-xs font-bold uppercase tracking-[0.3em] text-gold-dark">
            Neden Yeşil Rüya
          </span>
          <h2 className="mt-4 text-balance font-display text-4xl font-semibold text-emerald-dark sm:text-5xl">
            Zarafeti Standart Kılıyoruz
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = icons[feature.icon];
            return (
              <div
                key={feature.id}
                className="group relative overflow-hidden rounded-3xl bg-cream p-8 text-center shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-soft"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-radial shadow-gold transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <Icon className="h-7 w-7 text-gold-light" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-lg font-semibold text-emerald-dark">
                  {feature.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-ink/60">
                  {feature.description}
                </p>
                <span className="mx-auto mt-6 block h-0.5 w-10 rounded-full bg-gold-sheen" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
