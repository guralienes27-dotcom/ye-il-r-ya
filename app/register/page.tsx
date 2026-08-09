"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User as UserIcon, Mail, Phone, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterPage() {
  const { signUp } = useAuth();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor.");
      return;
    }

    if (password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır.");
      return;
    }

    setLoading(true);

    try {
      await signUp(fullName, email, phone, password);
      router.push("/profile");
    } catch {
      setError("Kayıt oluşturulamadı. E-posta zaten kullanılıyor olabilir.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="overflow-x-hidden bg-cream">
      <Navbar />

      <section className="relative flex min-h-screen items-center justify-center bg-emerald-radial px-6 pb-16 pt-32">
        <div className="grain absolute inset-0" aria-hidden="true" />

        <div className="glass relative w-full max-w-md rounded-[2rem] p-8 shadow-soft sm:p-10">
          <h1 className="font-display text-3xl font-semibold text-cream">
            Hesap Oluştur
          </h1>

          <p className="mt-2 font-body text-sm text-cream/60">
            Yeşil Rüya ailesine katılın, siparişlerinizi kolayca takip edin.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="mb-1.5 block font-body text-xs font-semibold text-cream/70"
              >
                Ad Soyad
              </label>

              <div className="flex items-center gap-2 rounded-xl border border-cream/15 bg-cream/5 px-4 py-3 focus-within:border-gold">
                <UserIcon className="h-4 w-4 shrink-0 text-cream/40" />

                <input
                  id="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-transparent font-body text-sm text-cream outline-none placeholder:text-cream/30"
                  placeholder="Adınız Soyadınız"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block font-body text-xs font-semibold text-cream/70"
              >
                E-posta
              </label>

              <div className="flex items-center gap-2 rounded-xl border border-cream/15 bg-cream/5 px-4 py-3 focus-within:border-gold">
                <Mail className="h-4 w-4 shrink-0 text-cream/40" />

                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent font-body text-sm text-cream outline-none placeholder:text-cream/30"
                  placeholder="ornek@eposta.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 block font-body text-xs font-semibold text-cream/70"
              >
                Telefon
              </label>

              <div className="flex items-center gap-2 rounded-xl border border-cream/15 bg-cream/5 px-4 py-3 focus-within:border-gold">
                <Phone className="h-4 w-4 shrink-0 text-cream/40" />

                <input
                  id="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-transparent font-body text-sm text-cream outline-none placeholder:text-cream/30"
                  placeholder="05xx xxx xx xx"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block font-body text-xs font-semibold text-cream/70"
              >
                Şifre
              </label>

              <div className="flex items-center gap-2 rounded-xl border border-cream/15 bg-cream/5 px-4 py-3 focus-within:border-gold">
                <Lock className="h-4 w-4 shrink-0 text-cream/40" />

                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent font-body text-sm text-cream outline-none placeholder:text-cream/30"
                  placeholder="En az 6 karakter"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block font-body text-xs font-semibold text-cream/70"
              >
                Şifre (Tekrar)
              </label>

              <div className="flex items-center gap-2 rounded-xl border border-cream/15 bg-cream/5 px-4 py-3 focus-within:border-gold">
                <Lock className="h-4 w-4 shrink-0 text-cream/40" />

                <input
                  id="confirmPassword"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-transparent font-body text-sm text-cream outline-none placeholder:text-cream/30"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="font-body text-xs font-semibold text-red-300"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-gold-sheen bg-[length:200%_auto] px-6 py-3.5 font-body text-sm font-bold text-emerald-dark shadow-gold transition-all duration-500 hover:bg-right hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Hesap oluşturuluyor..." : "Kayıt Ol"}
            </button>
          </form>

          <p className="mt-6 text-center font-body text-sm text-cream/60">
            Zaten hesabınız var mı?{" "}
            <Link
              href="/login"
              className="font-semibold text-gold-light transition-colors hover:text-gold"
            >
              Giriş Yap
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
} 