"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const { signIn, resetPassword } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signIn(email, password);
      router.push("/profile");
    } catch {
      setError("E-posta veya şifre hatalı. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError(null);
    setResetSent(false);

    if (!email) {
      setError("Şifre sıfırlamak için önce e-posta adresinizi girin.");
      return;
    }

    try {
      await resetPassword(email);
      setResetSent(true);
    } catch {
      setError("Şifre sıfırlama e-postası gönderilemedi.");
    }
  };

  return (
    <main className="overflow-x-hidden bg-cream">
      <Navbar />

      <section className="relative flex min-h-screen items-center justify-center bg-emerald-radial px-6 pb-16 pt-32">
        <div className="grain absolute inset-0" aria-hidden="true" />

        <div className="glass relative w-full max-w-md rounded-[2rem] p-8 shadow-soft sm:p-10">
          <h1 className="font-display text-3xl font-semibold text-cream">
            Giriş Yap
          </h1>

          <p className="mt-2 font-body text-sm text-cream/60">
            Hesabınıza giriş yaparak siparişlerinizi ve favorilerinizi takip edin.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            {resetSent && (
              <p className="font-body text-xs font-semibold text-gold-light">
                Şifre sıfırlama bağlantısı e-postanıza gönderildi.
              </p>
            )}

            <button
              type="button"
              onClick={handleForgotPassword}
              className="font-body text-xs font-semibold text-gold-light transition-colors hover:text-gold"
            >
              Şifremi Unuttum
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-gold-sheen bg-[length:200%_auto] px-6 py-3.5 font-body text-sm font-bold text-emerald-dark shadow-gold transition-all duration-500 hover:bg-right hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </button>
          </form>

          <p className="mt-6 text-center font-body text-sm text-cream/60">
            Hesabınız yok mu?{" "}
            <Link
              href="/register"
              className="font-semibold text-gold-light transition-colors hover:text-gold"
            >
              Kayıt Ol
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
} 