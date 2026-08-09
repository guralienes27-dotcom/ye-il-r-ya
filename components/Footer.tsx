import { Instagram, Facebook, Twitter, ArrowRight, MapPin, Phone, Mail } from "lucide-react";

const linkColumns = [
  {
    title: "Mağaza",
    links: ["Tüm Ürünler", "Yeni Sezon", "Hediye Kutuları", "Kurumsal Siparişler"],
  },
  {
    title: "Kurumsal",
    links: ["Hakkımızda", "Sürdürülebilirlik", "Basında Biz", "Kariyer"],
  },
  {
    title: "Destek",
    links: ["Sıkça Sorulan Sorular", "Kargo & Teslimat", "İade Koşulları", "Gizlilik Politikası"],
  },
];

export default function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden bg-emerald-dark pt-20">
      <div className="grain absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 border-b border-cream/10 pb-16 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-sheen shadow-gold">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-emerald-dark" fill="currentColor">
                  <path d="M12 2c-3 4-7 7-7 12a7 7 0 0014 0c0-5-4-8-7-12z" />
                </svg>
              </span>
              <span className="font-display text-lg font-semibold text-cream">
                Yeşil Rüya
              </span>
            </div>
            <p className="mt-5 max-w-xs font-body text-sm leading-relaxed text-cream/55">
              Antep&apos;in fıstığını, ustaların elini ve zamanın sabrını bir
              araya getiren prestij tatlı butiği.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors duration-300 hover:border-gold hover:text-gold-light"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {linkColumns.map((col) => (
            <div key={col.title}>
              <h4 className="font-body text-xs font-bold uppercase tracking-[0.2em] text-gold-light">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-sm text-cream/55 transition-colors duration-300 hover:text-cream"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter + contact */}
          <div>
            <h4 className="font-body text-xs font-bold uppercase tracking-[0.2em] text-gold-light">
              Bültenimize Katılın
            </h4>
            <p className="mt-4 font-body text-sm text-cream/55">
              Yeni tatlar ve özel davetlerden ilk siz haberdar olun.
            </p>
            <form className="mt-4 flex items-center gap-2">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="w-full rounded-full border border-cream/15 bg-cream/5 px-4 py-2.5 font-body text-sm text-cream placeholder:text-cream/40 outline-none focus:border-gold"
              />
              <button
                aria-label="Abone ol"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-sheen text-emerald-dark shadow-gold transition-transform hover:scale-105"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-7 space-y-3">
              <p className="flex items-center gap-2 font-body text-sm text-cream/55">
                <MapPin className="h-4 w-4 text-gold-light" /> Gaziantep, Türkiye
              </p>
              <p className="flex items-center gap-2 font-body text-sm text-cream/55">
                <Phone className="h-4 w-4 text-gold-light" /> +90 342 000 00 00
              </p>
              <p className="flex items-center gap-2 font-body text-sm text-cream/55">
                <Mail className="h-4 w-4 text-gold-light" /> merhaba@yesilruya.com
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <p className="font-body text-xs text-cream/40">
            © {new Date().getFullYear()} Yeşil Rüya Cennet Çamuru. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-4 font-body text-xs text-cream/40">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
