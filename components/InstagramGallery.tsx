import Image from "next/image";
import { Instagram, Heart } from "lucide-react";
import { instagramPosts } from "@/lib/data";

export default function InstagramGallery() {
  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="font-body text-xs font-bold uppercase tracking-[0.3em] text-gold-dark">
            @yesilruyacennetcamuru
          </span>
          <h2 className="mt-4 text-balance font-display text-4xl font-semibold text-emerald-dark sm:text-5xl">
            Bizi Instagram&apos;da Takip Edin
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href="#"
              className="group relative aspect-square overflow-hidden rounded-2xl shadow-card"
            >
              <Image
                src={post.image}
                alt="Yeşil Rüya Instagram paylaşımı"
                fill
                sizes="(min-width: 1024px) 16vw, 45vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-emerald-dark/0 opacity-0 transition-all duration-500 group-hover:bg-emerald-dark/70 group-hover:opacity-100">
                <Instagram className="h-6 w-6 text-cream" />
                <span className="flex items-center gap-1 font-body text-xs font-semibold text-cream">
                  <Heart className="h-3.5 w-3.5 fill-gold-light text-gold-light" />
                  {post.likes.toLocaleString("tr-TR")}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
