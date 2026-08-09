interface SectionDividerProps {
  tone?: "onCream" | "onEmerald";
}

/**
 * The brand signature: a slow, viscous gold "pour" line — a nod to
 * çamur (velvet ganache) being poured. Used sparingly as the seam
 * between major sections instead of a plain divider or hairline.
 */
export default function SectionDivider({ tone = "onCream" }: SectionDividerProps) {
  const strokeColor = tone === "onCream" ? "#D4AF37" : "#F8F3EA";

  return (
    <div className="relative flex w-full items-center justify-center py-2" aria-hidden="true">
      <svg
        viewBox="0 0 1200 60"
        className="h-10 w-full max-w-5xl px-6 opacity-70"
        preserveAspectRatio="none"
      >
        <path
          d="M0 30 C 150 5, 250 55, 400 30 S 650 5, 800 30 S 1050 55, 1200 30"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="600" cy="30" r="4" fill={strokeColor} />
      </svg>
    </div>
  );
}
