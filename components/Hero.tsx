import Image from "next/image";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";

/**
 * Static particle field — fixed positions/delays (not Math.random on
 * render) so server and client markup match exactly, no hydration drift.
 */
const particles = [
  { top: "12%", left: "6%", size: 4, delay: "0s", duration: "7s" },
  { top: "22%", left: "18%", size: 6, delay: "1.2s", duration: "9s" },
  { top: "8%", left: "32%", size: 3, delay: "2.4s", duration: "6.5s" },
  { top: "35%", left: "9%", size: 5, delay: "0.6s", duration: "8s" },
  { top: "48%", left: "22%", size: 3, delay: "3.1s", duration: "7.5s" },
  { top: "18%", left: "44%", size: 4, delay: "1.8s", duration: "10s" },
  { top: "62%", left: "14%", size: 6, delay: "2.7s", duration: "8.5s" },
  { top: "70%", left: "30%", size: 3, delay: "0.3s", duration: "6s" },
  { top: "55%", left: "40%", size: 4, delay: "4s", duration: "9.5s" },
  { top: "15%", left: "58%", size: 5, delay: "1.5s", duration: "7s" },
  { top: "30%", left: "68%", size: 3, delay: "2.9s", duration: "8s" },
  { top: "44%", left: "78%", size: 6, delay: "0.9s", duration: "9s" },
  { top: "60%", left: "60%", size: 4, delay: "3.6s", duration: "7.8s" },
  { top: "76%", left: "72%", size: 3, delay: "1.1s", duration: "6.8s" },
  { top: "8%", left: "82%", size: 5, delay: "2.1s", duration: "8.6s" },
  { top: "85%", left: "50%", size: 4, delay: "3.4s", duration: "9.2s" },
  { top: "40%", left: "90%", size: 3, delay: "0.4s", duration: "7.2s" },
  { top: "90%", left: "20%", size: 4, delay: "2.6s", duration: "8.3s" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex h-screen min-h-[640px] w-full items-center overflow-hidden bg-emerald-radial pt-20 sm:pt-24"
    >
      {/* Ambient grain texture — signature velvet surface */}
      <div className="grain absolute inset-0" />

      {/* Soft gold light effects */}
      <div
        className="pointer-events-none absolute -left-32 -top-24 h-[420px] w-[420px] rounded-full bg-gold/25 blur-[110px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/3 h-[380px] w-[380px] rounded-full bg-gold-light/20 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/3 h-[320px] w-[320px] rounded-full bg-gold/10 blur-[120px]"
        aria-hidden="true"
      />

      {/* Slow-drifting gold swirl, evoking a pour of çamur */}
      <svg
        viewBox="0 0 800 800"
        className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] animate-drift-slow opacity-20 lg:-right-20"
        aria-hidden="true"
      >
        <path
          d="M400 60 C 560 60, 720 200, 720 400 C 720 600, 560 740, 400 740 C 240 740, 100 600, 100 400"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2"
        />
        <path
          d="M400 140 C 520 140, 640 260, 640 400 C 640 540, 520 660, 400 660"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="1"
        />
      </svg>

      {/* Floating gold particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {particles.map((p, i) => (
          <span
            key={i}
            className="hero-particle absolute rounded-full"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        {/* Copy */}
        <div className="max-w-xl text-center lg:text-left">
          <span
            className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 font-body text-xs font-semibold tracking-[0.2em] text-gold-light"
            style={{ animationDelay: "0s" }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            GAZİANTEP&apos;İN GURURU · GÜNLÜK ÜRETİM
          </span>

          <h1
            className="animate-fade-up text-balance font-display text-[2.6rem] font-semibold leading-[1.12] text-cream sm:text-6xl lg:text-[4.1rem] lg:leading-[1.08]"
            style={{ animationDelay: "0.12s" }}
          >
            Gaziantep&apos;in En Özel{" "}
            <span className="text-gold-light">Cennet Çamuru</span>
          </h1>

          <p
            className="animate-fade-up mx-auto mt-6 max-w-md font-accent text-xl italic leading-relaxed text-cream/70 lg:mx-0"
            style={{ animationDelay: "0.24s" }}
          >
            Geleneksel tarif, günlük üretim, gerçek Antep fıstığı ve eşsiz
            lezzet.
          </p>

          <div
            className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            style={{ animationDelay: "0.36s" }}
          >
            <a
              href="#products"
              className="group inline-flex items-center gap-2 rounded-full bg-gold-sheen bg-[length:200%_auto] px-8 py-4 font-body text-sm font-bold tracking-wide text-emerald-dark shadow-gold transition-all duration-500 hover:bg-right hover:shadow-lg"
            >
              <ShoppingBag className="h-4 w-4" />
              Hemen Sipariş Ver
            </a>
            <a
              href="#products"
              className="group inline-flex items-center gap-2 rounded-full border border-cream/25 bg-cream/5 px-8 py-4 font-body text-sm font-semibold text-cream/90 backdrop-blur transition-colors duration-300 hover:bg-cream/10"
            >
              Ürünleri İncele
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Premium product presentation */}
        <div
          className="animate-fade-up relative mx-auto h-[360px] w-full max-w-md lg:h-[560px] lg:max-w-none"
          style={{ animationDelay: "0.2s" }}
        >
          {/* Thin rotating gold ring behind the product */}
          <svg
            viewBox="0 0 400 400"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[112%] w-[112%] -translate-x-1/2 -translate-y-1/2 animate-drift-slow opacity-40"
            aria-hidden="true"
          >
            <circle
              cx="200"
              cy="200"
              r="188"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1"
              strokeDasharray="2 10"
            />
          </svg>

          <div className="absolute inset-0 animate-float">
            <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] shadow-soft ring-1 ring-cream/10">
              <Image
                src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80"
                alt="Yeşil Rüya Cennet Çamuru — Antep fıstıklı imza tatlı"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-dark/50 via-transparent to-transparent" />
            </div>
          </div>

          {/* Floating glass spotlight card */}
          <div className="glass absolute -bottom-6 left-1/2 w-[86%] -translate-x-1/2 rounded-2xl p-5 shadow-soft sm:w-72 lg:-bottom-8 lg:left-auto lg:right-0 lg:translate-x-0">
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-light">
              Bu Haftanın Seçkisi
            </p>
            <p className="mt-1 font-display text-lg font-semibold text-cream">
              Cennet Çamuru Klasik
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-display text-xl font-bold text-gold-light">₺420</span>
              <a
                href="#products"
                className="rounded-full bg-cream/95 px-4 py-2 font-body text-xs font-bold text-emerald-dark transition-transform hover:scale-105"
              >
                Sepete Ekle
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scoped styles for the floating particle effect — kept local to Hero */}
      <style>{`
        .hero-particle {
          background: radial-gradient(circle, #f3d98a 0%, #d4af37 55%, rgba(212, 175, 55, 0) 75%);
          box-shadow: 0 0 8px 2px rgba(212, 175, 55, 0.55);
          opacity: 0;
          animation-name: heroParticleFloat;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        @keyframes heroParticleFloat {
          0% {
            transform: translateY(0) scale(0.8);
            opacity: 0;
          }
          15% {
            opacity: 0.9;
          }
          50% {
            transform: translateY(-38px) scale(1.05);
            opacity: 0.6;
          }
          85% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(-78px) scale(0.8);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-particle {
            animation: none;
            opacity: 0.5;
          }
        }
      `}</style>
    </section>
  );
}
