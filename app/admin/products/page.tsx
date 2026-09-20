"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  RefreshCw,
  Image as ImageIcon,
  CheckCircle2,
} from "lucide-react";

type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number | string;
  currency: string;
  short_description: string;
  description: string;
  image: string;
  featured: boolean | number;
  rating: number | string;
  reviews: number;
  active: boolean | number;
};

export default function ProductsAdminPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadProducts = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/admin/products", {
        method: "GET",
        cache: "no-store",
      });

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ürünler alınamadı.");
      }

      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
      setError("Ürünler yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadProducts();
  }, []);

  const updateProduct = (
    id: string,
    field: keyof Product,
    value: string | number | boolean
  ) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === id
          ? {
              ...product,
              [field]: value,
            }
          : product
      )
    );
  };

  const saveProduct = async (product: Product) => {
    setSavingId(product.id);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `/api/admin/products/${encodeURIComponent(product.id)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            slug: product.slug,
            name: product.name,
            category: product.category,
            price: Number(product.price),
            currency: product.currency,
            shortDescription: product.short_description,
            description: product.description,
            image: product.image,
            featured: Boolean(product.featured),
            rating: Number(product.rating),
            reviews: Number(product.reviews),
            active: Boolean(product.active),
          }),
        }
      );

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Ürün güncellenemedi."
        );
      }

      setMessage(`"${product.name}" başarıyla güncellendi.`);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (err) {
      console.error(err);
      setError("Ürün kaydedilirken bir hata oluştu.");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-emerald-radial px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="mb-4 inline-flex items-center gap-2 font-body text-sm font-semibold text-emerald-dark transition-opacity hover:opacity-70"
            >
              <ArrowLeft className="h-4 w-4" />
              Siparişlere Dön
            </button>

            <p className="font-body text-sm font-semibold text-gold-dark">
              Yönetim Paneli
            </p>

            <h1 className="mt-1 font-display text-4xl font-bold text-emerald-dark">
              Ürünler
            </h1>

            <p className="mt-2 font-body text-sm text-ink/50">
              Ürün bilgilerini buradan düzenleyebilirsin.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void loadProducts()}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-dark px-5 py-3 font-body text-sm font-bold text-cream shadow-soft transition-transform hover:scale-105 disabled:opacity-50"
          >
            <RefreshCw
              className={`h-4 w-4 ${
                loading ? "animate-spin" : ""
              }`}
            />
            Yenile
          </button>
        </div>

        {/* MESAJLAR */}
        {message && (
          <div className="mt-6 flex items-center gap-2 rounded-2xl border border-emerald/20 bg-emerald/10 p-4">
            <CheckCircle2 className="h-5 w-5 text-emerald-dark" />

            <p className="font-body text-sm font-semibold text-emerald-dark">
              {message}
            </p>
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4">
            <p className="font-body text-sm text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="mt-10 flex min-h-[300px] items-center justify-center rounded-[2rem] border border-emerald/10 bg-cream/90">
            <div className="text-center">
              <RefreshCw className="mx-auto h-8 w-8 animate-spin text-emerald" />

              <p className="mt-4 font-body text-sm text-ink/50">
                Ürünler yükleniyor...
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-6">
            {products.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-[2rem] border border-emerald/10 bg-cream/95 shadow-soft"
              >
                <div className="grid gap-6 p-6 lg:grid-cols-[220px_1fr]">
                  {/* GÖRSEL */}
                  <div>
                    <div className="aspect-square overflow-hidden rounded-2xl bg-emerald/5">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <ImageIcon className="h-12 w-12 text-emerald/30" />
                        </div>
                      )}
                    </div>

                    <label className="mt-3 block font-body text-xs font-semibold text-emerald-dark">
                      Görsel yolu
                    </label>

                    <input
                      type="text"
                      value={product.image}
                      onChange={(event) =>
                        updateProduct(
                          product.id,
                          "image",
                          event.target.value
                        )
                      }
                      className="mt-2 w-full rounded-xl border border-emerald/20 bg-white px-3 py-2 font-body text-xs text-ink outline-none focus:border-emerald"
                      placeholder="/images/urun.jpg"
                    />
                  </div>

                  {/* BİLGİLER */}
                  <div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="font-body text-xs font-semibold text-emerald-dark">
                          Ürün adı
                        </label>

                        <input
                          type="text"
                          value={product.name}
                          onChange={(event) =>
                            updateProduct(
                              product.id,
                              "name",
                              event.target.value
                            )
                          }
                          className="mt-2 w-full rounded-xl border border-emerald/20 bg-white px-4 py-3 font-body text-sm outline-none focus:border-emerald"
                        />
                      </div>

                      <div>
                        <label className="font-body text-xs font-semibold text-emerald-dark">
                          Fiyat
                        </label>

                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={product.price}
                          onChange={(event) =>
                            updateProduct(
                              product.id,
                              "price",
                              Number(event.target.value)
                            )
                          }
                          className="mt-2 w-full rounded-xl border border-emerald/20 bg-white px-4 py-3 font-body text-sm outline-none focus:border-emerald"
                        />
                      </div>

                      <div>
                        <label className="font-body text-xs font-semibold text-emerald-dark">
                          Kategori
                        </label>

                        <select
                          value={product.category}
                          onChange={(event) =>
                            updateProduct(
                              product.id,
                              "category",
                              event.target.value
                            )
                          }
                          className="mt-2 w-full rounded-xl border border-emerald/20 bg-white px-4 py-3 font-body text-sm outline-none focus:border-emerald"
                        >
                          <option value="Cennet Çamuru">
                            Cennet Çamuru
                          </option>
                          <option value="Künefe">
                            Künefe
                          </option>
                          <option value="Kadayif">
                            Kadayıf
                          </option>
                          <option value="Katmer">
                            Katmer
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="font-body text-xs font-semibold text-emerald-dark">
                          Slug
                        </label>

                        <input
                          type="text"
                          value={product.slug}
                          onChange={(event) =>
                            updateProduct(
                              product.id,
                              "slug",
                              event.target.value
                            )
                          }
                          className="mt-2 w-full rounded-xl border border-emerald/20 bg-white px-4 py-3 font-body text-sm outline-none focus:border-emerald"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="font-body text-xs font-semibold text-emerald-dark">
                        Kısa açıklama
                      </label>

                      <input
                        type="text"
                        value={product.short_description}
                        onChange={(event) =>
                          updateProduct(
                            product.id,
                            "short_description",
                            event.target.value
                          )
                        }
                        className="mt-2 w-full rounded-xl border border-emerald/20 bg-white px-4 py-3 font-body text-sm outline-none focus:border-emerald"
                      />
                    </div>

                    <div className="mt-4">
                      <label className="font-body text-xs font-semibold text-emerald-dark">
                        Açıklama
                      </label>

                      <textarea
                        rows={4}
                        value={product.description}
                        onChange={(event) =>
                          updateProduct(
                            product.id,
                            "description",
                            event.target.value
                          )
                        }
                        className="mt-2 w-full resize-y rounded-xl border border-emerald/20 bg-white px-4 py-3 font-body text-sm outline-none focus:border-emerald"
                      />
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-5">
                      <label className="flex cursor-pointer items-center gap-2 font-body text-sm font-semibold text-emerald-dark">
                        <input
                          type="checkbox"
                          checked={Boolean(product.featured)}
                          onChange={(event) =>
                            updateProduct(
                              product.id,
                              "featured",
                              event.target.checked
                            )
                          }
                          className="h-4 w-4"
                        />
                        Öne çıkan
                      </label>

                      <label className="flex cursor-pointer items-center gap-2 font-body text-sm font-semibold text-emerald-dark">
                        <input
                          type="checkbox"
                          checked={Boolean(product.active)}
                          onChange={(event) =>
                            updateProduct(
                              product.id,
                              "active",
                              event.target.checked
                            )
                          }
                          className="h-4 w-4"
                        />
                        Aktif
                      </label>

                      <button
                        type="button"
                        onClick={() => void saveProduct(product)}
                        disabled={savingId === product.id}
                        className="ml-auto inline-flex items-center justify-center gap-2 rounded-full bg-emerald-dark px-6 py-3 font-body text-sm font-bold text-cream shadow-soft transition-transform hover:scale-105 disabled:cursor-wait disabled:opacity-50"
                      >
                        {savingId === product.id ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4" />
                        )}

                        {savingId === product.id
                          ? "Kaydediliyor..."
                          : "Kaydet"}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}