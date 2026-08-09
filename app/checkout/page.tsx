"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ShoppingBag, ArrowLeft } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cart-context";
import { db } from "@/lib/firebase";

type FormErrors = {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
};

export default function CheckoutPage() {
  const {
    items,
    totalPrice,
    currency,
    clearCart,
  } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Ad soyad alanı zorunludur.";
    }

    if (!phone.trim()) {
      newErrors.phone = "Telefon numarası zorunludur.";
    } else if (phone.trim().length < 10) {
      newErrors.phone = "Geçerli bir telefon numarası girin.";
    }

    if (!email.trim()) {
      newErrors.email = "E-posta alanı zorunludur.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Geçerli bir e-posta adresi girin.";
    }

    if (!address.trim()) {
      newErrors.address = "Adres alanı zorunludur.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitting) return;

    setSubmitError("");

    if (!validate()) {
      return;
    }

    if (items.length === 0) {
      setSubmitError("Sepetiniz boş. Sipariş oluşturamazsınız.");
      return;
    }

    setSubmitting(true);

    try {
      const generatedOrderNumber = `YR-${Date.now()
        .toString()
        .slice(-8)}`;

      const orderData = {
        orderNumber: generatedOrderNumber,

        customer: {
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          address: address.trim(),
        },

        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          currency: item.currency,
          image: item.image,
          quantity: item.quantity,
          subtotal: item.price * item.quantity,
        })),

        totalPrice,
        currency,

        status: "pending",

        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "orders"), orderData);

      setOrderNumber(generatedOrderNumber);

      clearCart();
    } catch (error) {
      console.error("Sipariş oluşturulamadı:", error);

      setSubmitError(
        "Sipariş oluşturulurken bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (orderNumber) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-emerald-radial px-6 py-20">
          <div className="mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center">
            <div className="w-full rounded-[2rem] border border-emerald/10 bg-cream/90 p-8 text-center shadow-soft backdrop-blur-xl sm:p-12">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald/10">
                <CheckCircle2 className="h-10 w-10 text-emerald" />
              </div>

              <h1 className="mt-6 font-display text-3xl font-bold text-emerald-dark sm:text-4xl">
                Siparişiniz Alındı!
              </h1>

              <p className="mt-4 font-body text-base leading-relaxed text-ink/60">
                Siparişiniz başarıyla oluşturuldu. Sipariş bilgileriniz
                işletmeye iletildi.
              </p>

              <div className="mx-auto mt-8 max-w-sm rounded-2xl bg-emerald/5 p-5">
                <p className="font-body text-sm text-ink/50">
                  Sipariş Numaranız
                </p>

                <p className="mt-1 font-display text-2xl font-bold text-emerald-dark">
                  {orderNumber}
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-sheen px-6 py-3 font-body text-sm font-bold text-emerald-dark shadow-gold transition-transform hover:scale-105"
                >
                  Ana Sayfaya Dön
                </Link>

                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald/10 px-6 py-3 font-body text-sm font-bold text-emerald-dark transition-colors hover:bg-emerald/5"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Alışverişe Devam Et
                </Link>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-emerald-radial px-6 py-20">
          <div className="mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center">
            <div className="w-full rounded-[2rem] border border-emerald/10 bg-cream/90 p-8 text-center shadow-soft backdrop-blur-xl sm:p-12">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald/10">
                <ShoppingBag className="h-10 w-10 text-emerald" />
              </div>

              <h1 className="mt-6 font-display text-3xl font-bold text-emerald-dark">
                Sepetiniz Boş
              </h1>

              <p className="mt-3 font-body text-sm text-ink/60">
                Sipariş vermek için önce sepetinize ürün ekleyin.
              </p>

              <Link
                href="/"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gold-sheen px-6 py-3 font-body text-sm font-bold text-emerald-dark shadow-gold transition-transform hover:scale-105"
              >
                <ArrowLeft className="h-4 w-4" />
                Alışverişe Başla
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-emerald-radial px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-body text-sm font-semibold text-emerald transition-colors hover:text-gold-dark"
            >
              <ArrowLeft className="h-4 w-4" />
              Alışverişe Dön
            </Link>

            <h1 className="mt-5 font-display text-4xl font-bold text-emerald-dark sm:text-5xl">
              Siparişi Tamamla
            </h1>

            <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-ink/60">
              Siparişinizin hazırlanabilmesi için iletişim ve teslimat
              bilgilerinizi eksiksiz doldurun.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <form
              onSubmit={handleSubmit}
              className="rounded-[2rem] border border-emerald/10 bg-cream/90 p-6 shadow-soft backdrop-blur-xl sm:p-8"
            >
              <h2 className="font-display text-2xl font-bold text-emerald-dark">
                Teslimat Bilgileri
              </h2>

              <div className="mt-7 space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="font-body text-sm font-semibold text-emerald-dark"
                  >
                    Ad Soyad
                  </label>

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Adınız ve soyadınız"
                    className={`mt-2 w-full rounded-2xl border bg-white/60 px-4 py-3 font-body text-sm text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-emerald ${
                      errors.name
                        ? "border-red-400"
                        : "border-emerald/10"
                    }`}
                  />

                  {errors.name && (
                    <p className="mt-1.5 font-body text-xs text-red-500">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="font-body text-sm font-semibold text-emerald-dark"
                  >
                    Telefon
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="05XX XXX XX XX"
                    className={`mt-2 w-full rounded-2xl border bg-white/60 px-4 py-3 font-body text-sm text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-emerald ${
                      errors.phone
                        ? "border-red-400"
                        : "border-emerald/10"
                    }`}
                  />

                  {errors.phone && (
                    <p className="mt-1.5 font-body text-xs text-red-500">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="font-body text-sm font-semibold text-emerald-dark"
                  >
                    E-posta
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="ornek@email.com"
                    className={`mt-2 w-full rounded-2xl border bg-white/60 px-4 py-3 font-body text-sm text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-emerald ${
                      errors.email
                        ? "border-red-400"
                        : "border-emerald/10"
                    }`}
                  />

                  {errors.email && (
                    <p className="mt-1.5 font-body text-xs text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="font-body text-sm font-semibold text-emerald-dark"
                  >
                    Teslimat Adresi
                  </label>

                  <textarea
                    id="address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    placeholder="Mahalle, sokak, bina no, daire no..."
                    rows={5}
                    className={`mt-2 w-full resize-none rounded-2xl border bg-white/60 px-4 py-3 font-body text-sm text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-emerald ${
                      errors.address
                        ? "border-red-400"
                        : "border-emerald/10"
                    }`}
                  />

                  {errors.address && (
                    <p className="mt-1.5 font-body text-xs text-red-500">
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>

              {submitError && (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                  <p className="font-body text-sm text-red-600">
                    {submitError}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-8 w-full rounded-full bg-gold-sheen bg-[length:200%_auto] px-6 py-4 font-body text-sm font-bold text-emerald-dark shadow-gold transition-all duration-500 hover:bg-right hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Sipariş Oluşturuluyor..." : "Siparişi Onayla"}
              </button>
            </form>

            <aside className="h-fit rounded-[2rem] border border-emerald/10 bg-emerald-dark p-6 text-cream shadow-soft sm:p-7 lg:sticky lg:top-6">
              <h2 className="font-display text-2xl font-bold">
                Sipariş Özeti
              </h2>

              <div className="mt-6 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 border-b border-cream/10 pb-4"
                  >
                    <div className="flex-1">
                      <p className="font-body text-sm font-semibold">
                        {item.name}
                      </p>

                      <p className="mt-1 font-body text-xs text-cream/50">
                        {item.quantity} adet × {item.currency}
                        {item.price}
                      </p>
                    </div>

                    <p className="font-body text-sm font-bold text-gold-light">
                      {item.currency}
                      {item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-cream/10 pt-5">
                <span className="font-body text-sm text-cream/60">
                  Genel Toplam
                </span>

                <span className="font-display text-2xl font-bold text-gold-light">
                  {currency}
                  {totalPrice}
                </span>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
} 