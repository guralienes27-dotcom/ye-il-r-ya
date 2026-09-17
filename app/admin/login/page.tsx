"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, User, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) return;

    setError("");

    if (!username.trim() || !password) {
      setError("Kullanıcı adı ve şifre gereklidir.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Giriş yapılamadı.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("Admin giriş hatası:", error);
      setError("Sunucuya bağlanılamadı. Tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-emerald-radial px-6 py-12">
      <div className="w-full max-w-md rounded-[2rem] border border-emerald/10 bg-cream/95 p-8 shadow-soft backdrop-blur-xl sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-dark text-gold-light">
          <LockKeyhole className="h-8 w-8" />
        </div>

        <div className="mt-6 text-center">
          <h1 className="font-display text-3xl font-bold text-emerald-dark">
            Yönetim Paneli
          </h1>

          <p className="mt-2 font-body text-sm text-ink/50">
            Devam etmek için yönetici hesabınızla giriş yapın.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="username"
              className="font-body text-sm font-semibold text-emerald-dark"
            >
              Kullanıcı Adı
            </label>

            <div className="relative mt-2">
              <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/30" />

              <input
                id="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Kullanıcı adınız"
                className="w-full rounded-2xl border border-emerald/10 bg-white/70 py-3 pl-12 pr-4 font-body text-sm text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-emerald"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="font-body text-sm font-semibold text-emerald-dark"
            >
              Şifre
            </label>

            <div className="relative mt-2">
              <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/30" />

              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-emerald/10 bg-white/70 py-3 pl-12 pr-4 font-body text-sm text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-emerald"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="font-body text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-sheen bg-[length:200%_auto] px-6 py-4 font-body text-sm font-bold text-emerald-dark shadow-gold transition-all duration-500 hover:bg-right active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Giriş Yapılıyor...
              </>
            ) : (
              <>
                <LockKeyhole className="h-4 w-4" />
                Giriş Yap
              </>
            )}
          </button>
        </form>

        <p className="mt-7 text-center font-body text-xs text-ink/35">
          Yetkisiz erişim yasaktır.
        </p>
      </div>
    </main>
  );
}