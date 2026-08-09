"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { user, profile, signOutUser } = useAuth();

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-cream">
        <Navbar />

        <section className="mx-auto max-w-5xl px-6 pt-36 pb-20">
          <h1 className="font-display text-4xl font-bold text-emerald-dark">
            Hesabım
          </h1>

          <div className="mt-10 rounded-3xl bg-white p-8 shadow-lg">

            <div className="space-y-6">

              <div>
                <p className="text-sm text-gray-500">Ad Soyad</p>
                <h2 className="text-xl font-semibold">
                  {profile?.fullName || user?.displayName}
                </h2>
              </div>

              <div>
                <p className="text-sm text-gray-500">E-posta</p>
                <h2 className="text-xl font-semibold">
                  {user?.email}
                </h2>
              </div>

              <div>
                <p className="text-sm text-gray-500">Telefon</p>
                <h2 className="text-xl font-semibold">
                  {profile?.phone}
                </h2>
              </div>

            </div>

            <button
              onClick={signOutUser}
              className="mt-10 rounded-full bg-red-600 px-8 py-3 text-white font-semibold hover:bg-red-700"
            >
              Çıkış Yap
            </button>

          </div>
        </section>

        <Footer />
      </main>
    </ProtectedRoute>
  );
} 