import Image from "next/image";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";

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

const images = [
  "/images/fistikli-katmer.png",
  "/images/tel-kadayif.png",
  "/images/cennet-camuru.jpg",
  "/images/gerebic.webp",
  "/images/GEREBİC-FOTO.webp",
];

// Tek bir galeri grubu ekran genişliğinden kısa kalırsa kayarken boşluk görünebilir.
// Bu yüzden aynı görselleri grup içinde de iki kez kullanıyoruz.
const marqueeImages = [...images, ...images];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex w-full flex-col overflow-hidden bg-emerald-radial pt-28 sm:pt-32"
    >
      <div className="grain absolute inset-0" />

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

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
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

      {/*
        KÖK NEDEN: section "flex" idi ama "flex-col" değildi, bu yüzden
        bu içerik bloğu ile en alttaki galeri şeridi yan yana (row)
        dizilmeye çalışıyor, birbirine giriyor ve başlık kelime kelime
        alt satıra düşüyordu. Şimdi section flex-col; bu blok "flex-1"
        ile üstte kalan tüm dikey alanı kaplayıp içeriği ortalıyor,
        galeri şeridi ise doğal akışta en altta, hiçbir yazıya değmeden
        duruyor.
      */}
      <div className="relative z-10 flex flex-1 items-center py-12 sm:py-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            <span
              className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 font-body text-xs font-semibold tracking-[0.2em] text-gold-light"
              style={{ animationDelay: "0s" }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              GAZİANTEP&apos;İN GURURU · GÜNLÜK ÜRETİM ve TAZELİK
            </span>

            <h1
              className="animate-fade-up text-balance font-display text-4xl font-semibold leading-[1.15] text-cream sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]"
              style={{ animationDelay: "0.12s" }}
            >
              Kilis&apos;in Efsane Lezzetleri Gaziantep&apos;de{" "}
              <span className="text-gold-light">Cennet Çamuru ve gerebiç</span>
            </h1>

            <p
              className="animate-fade-up mx-auto mt-6 max-w-md font-accent text-lg italic leading-relaxed text-cream/70 lg:mx-0"
              style={{ animationDelay: "0.24s" }}
            >
              Geleneksel tarif, günlük üretim, gerçek Antep fıstığı ve eşsiz
              lezzet hepsi bir arada. şimdi sipariş ver.
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

          <div
            className="animate-fade-up relative mx-auto h-[320px] w-full max-w-md lg:h-[480px] lg:max-w-none"
            style={{ animationDelay: "0.2s" }}
          >
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
                {/* KENDİ FOTOĞRAFIMIZ */}
                <Image
                  src="/images/cennet-camuru.jpg"
                  alt="Yeşil Rüya Cennet Çamuru"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-contain"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-emerald-dark/50 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KESİNTİSİZ SONSUZ KAYAN GALERİ */}
      <div className="relative z-10 w-full overflow-hidden border-t border-cream/10 bg-emerald-dark/40 py-5 backdrop-blur-sm">
        <div className="hero-marquee flex w-max">
          {[0, 1].map((group) => (
            <div
              key={group}
              className="flex shrink-0 gap-6 pr-6"
              aria-hidden={group === 1 ? true : undefined}
            >
              {marqueeImages.map((src, i) => (
                <div
                  key={`${group}-${i}`}
                  className="relative h-28 w-40 flex-shrink-0 overflow-hidden rounded-xl ring-1 ring-cream/15 sm:h-32 sm:w-48"
                >
                  <Image
                    src={src}
                    alt={group === 0 ? `Galeri görseli ${(i % images.length) + 1}` : ""}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hero-particle {
          background: radial-gradient(
            circle,
            #f3d98a 0%,
            #d4af37 55%,
            rgba(212, 175, 55, 0) 75%
          );
          box-shadow: 0 0 8px 2px rgba(212, 175, 55, 0.55);
          opacity: 0;
          animation-name: heroParticleFloat;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }


        .hero-marquee {
          animation: heroMarquee 28s linear infinite;
          will-change: transform;
        }

        @keyframes heroMarquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
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

          .hero-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
