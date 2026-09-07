"use client";

export default function AnnouncementBar() {
  const text =
    "YEŞİL RÜYA CENNET ÇAMURU  •  GEREBİÇ  •  GELENEKSEL LEZZET  •  ";

  return (
    <div
      className="relative z-[9999] block h-10 w-full overflow-hidden bg-emerald-dark"
      style={{
        position: "relative",
        backgroundColor: "#092E25",
        color: "#F8F3EA",
      }}
    >
      <div
        className="flex h-full w-max items-center whitespace-nowrap"
        style={{
          animation: "announcement-marquee 20s linear infinite",
        }}
      >
        <span className="px-6 text-xs font-semibold tracking-[0.18em] sm:text-sm">
          {text}
        </span>
        <span className="px-6 text-xs font-semibold tracking-[0.18em] sm:text-sm">
          {text}
        </span>
        <span className="px-6 text-xs font-semibold tracking-[0.18em] sm:text-sm">
          {text}
        </span>
        <span className="px-6 text-xs font-semibold tracking-[0.18em] sm:text-sm">
          {text}
        </span>
      </div>

      <style jsx>{`
        @keyframes announcement-marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
} 