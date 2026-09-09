```tsx
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import {
  User,
  Mail,
  Phone,
  Package,
  MapPin,
  Settings,
  LogOut,
} from "lucide-react";

export default function ProfilePage() {
  const { user, profile, signOutUser } = useAuth();

  const displayName =
    profile?.fullName || user?.displayName || "Kullanıcı";

  const firstLetter = displayName.charAt(0).toUpperCase();

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-cream">
        <Navbar />

        <section className="mx-auto max-w-6xl px-6 pb-24 pt-36">
          <div className="mb-10">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold-dark">
              Hesap Merkezi
            </p>

            <h1 className="mt-2 font-display text-4xl font-bold text-emerald-dark sm:text-5xl">
              Hesabım
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-600">
              Profil bilgilerinizi, siparişlerinizi ve hesap ayarlarınızı
              buradan yönetebilirsiniz.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
            {/* SOL PROFİL KARTI */}
            <div className="rounded-3xl bg-emerald p-8 text-center shadow-soft">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gold-sheen text-3xl font-bold text-emerald-dark shadow-gold">
                {firstLetter}
              </div>

              <h2 className="mt-5 font-display text-2xl font-semibold text-cream">
                {displayName}
              </h2>

              <p className="mt-1 text-sm text-cream/60">
                {user?.email}
              </p>

              <div className="mt-8 border-t border-cream/10 pt-6">
                <button
                  onClick={signOutUser}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  <LogOut className="h-4 w-4" />
                  Çıkış Yap
                </button>
              </div>
            </div>

            {/* SAĞ TARAF */}
            <div className="space-y-8">
              {/* KİŞİSEL BİLGİLER */}
              <div className="rounded-3xl bg-white p-8 shadow-lg">
                <div className="mb-7 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald/10">
                    <User className="h-5 w-5 text-emerald" />
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-semibold text-emerald-dark">
                      Kişisel Bilgiler
                    </h3>
                    <p className="text-sm text-gray-500">
                      Hesabınıza kayıtlı bilgiler
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="rounded-2xl bg-cream p-5">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User className="h-4 w-4" />
                      Ad Soyad
                    </div>

                    <p className="mt-2 font-semibold text-emerald-dark">
                      {displayName}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-cream p-5">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Mail className="h-4 w-4" />
                      E-posta
                    </div>

                    <p className="mt-2 break-all font-semibold text-emerald-dark">
                      {user?.email || "Belirtilmemiş"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-cream p-5">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Phone className="h-4 w-4" />
                      Telefon
                    </div>

                    <p className="mt-2 font-semibold text-emerald-dark">
                      {profile?.phone || "Belirtilmemiş"}
                    </p>
                  </div>
                </div>
              </div>

              {/* HESAP MENÜLERİ */}
              <div className="grid gap-5 md:grid-cols-3">
                <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15">
                    <Package className="h-5 w-5 text-gold-dark" />
                  </div>

                  <h3 className="mt-5 font-display text-xl font-semibold text-emerald-dark">
                    Siparişlerim
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    Geçmiş ve mevcut siparişlerinizi görüntüleyin.
                  </p>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15">
                    <MapPin className="h-5 w-5 text-gold-dark" />
                  </div>

                  <h3 className="mt-5 font-display text-xl font-semibold text-emerald-dark">
                    Adreslerim
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    Teslimat adreslerinizi yönetin.
                  </p>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15">
                    <Settings className="h-5 w-5 text-gold-dark" />
                  </div>

                  <h3 className="mt-5 font-display text-xl font-semibold text-emerald-dark">
                    Ayarlar
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    Profil ve hesap tercihlerinizi düzenleyin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </ProtectedRoute>
  );
}
```
