"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  RefreshCw,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  LogOut,
} from "lucide-react";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  subtotal: number;
};

type Order = {
  id: number;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  customer_address: string;
  items: OrderItem[] | string;
  total_price: number | string;
  currency: string;
  status: string;
  created_at: string;
};

const statusOptions = [
  { value: "pending", label: "Bekliyor" },
  { value: "preparing", label: "Hazırlanıyor" },
  { value: "completed", label: "Tamamlandı" },
  { value: "cancelled", label: "İptal Edildi" },
];

export default function AdminPage() {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/orders", {
        method: "GET",
        cache: "no-store",
      });

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Siparişler alınamadı.");
      }

      setOrders(data.orders || []);
    } catch (error) {
      console.error("Sipariş yükleme hatası:", error);
      setError("Siparişler yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void loadOrders();
  }, [loadOrders]);

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Çıkış hatası:", error);
    } finally {
      router.replace("/admin/login");
      router.refresh();
      setLoggingOut(false);
    }
  };

  const updateStatus = async (orderId: number, status: string) => {
    setUpdatingId(orderId);
    setError("");

    try {
      const response = await fetch(
        `/api/admin/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Sipariş durumu güncellenemedi."
        );
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId
            ? { ...order, status }
            : order
        )
      );
    } catch (error) {
      console.error("Durum güncelleme hatası:", error);
      setError("Sipariş durumu değiştirilemedi.");
      await loadOrders();
    } finally {
      setUpdatingId(null);
    }
  };

  const parseItems = (items: Order["items"]): OrderItem[] => {
    if (Array.isArray(items)) {
      return items;
    }

    try {
      return JSON.parse(items) as OrderItem[];
    } catch {
      return [];
    }
  };

  const getStatus = (status: string) => {
    switch (status) {
      case "preparing":
        return {
          text: "Hazırlanıyor",
          icon: Package,
        };

      case "completed":
        return {
          text: "Tamamlandı",
          icon: CheckCircle2,
        };

      case "cancelled":
        return {
          text: "İptal Edildi",
          icon: XCircle,
        };

      default:
        return {
          text: "Bekliyor",
          icon: Clock,
        };
    }
  };

  return (
    <main className="min-h-screen bg-emerald-radial px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-body text-sm font-semibold text-gold-dark">
              Yönetim Paneli
            </p>

            <h1 className="mt-1 font-display text-4xl font-bold text-emerald-dark">
              Siparişler
            </h1>

            <p className="mt-2 font-body text-sm text-ink/50">
              Toplam {orders.length} sipariş görüntüleniyor.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void loadOrders()}
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

            <button
              type="button"
              onClick={() => void handleLogout()}
              disabled={loggingOut}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-3 font-body text-sm font-bold text-red-600 transition-transform hover:scale-105 disabled:cursor-wait disabled:opacity-50"
            >
              {loggingOut ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="h-4 w-4" />
              )}

              {loggingOut ? "Çıkış Yapılıyor..." : "Çıkış Yap"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-4">
            <p className="font-body text-sm text-red-600">
              {error}
            </p>
          </div>
        )}

        {loading && orders.length === 0 ? (
          <div className="mt-10 flex min-h-[300px] items-center justify-center rounded-[2rem] border border-emerald/10 bg-cream/80">
            <div className="text-center">
              <RefreshCw className="mx-auto h-8 w-8 animate-spin text-emerald" />

              <p className="mt-4 font-body text-sm text-ink/50">
                Siparişler yükleniyor...
              </p>
            </div>
          </div>
        ) : orders.length === 0 ? (
          <div className="mt-10 rounded-[2rem] border border-emerald/10 bg-cream/90 p-12 text-center shadow-soft">
            <ShoppingBag className="mx-auto h-12 w-12 text-emerald/40" />

            <h2 className="mt-4 font-display text-2xl font-bold text-emerald-dark">
              Henüz sipariş yok
            </h2>
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            {orders.map((order) => {
              const items = parseItems(order.items);
              const status = getStatus(order.status);
              const StatusIcon = status.icon;

              return (
                <article
                  key={order.id}
                  className="overflow-hidden rounded-[2rem] border border-emerald/10 bg-cream/95 shadow-soft"
                >
                  <div className="flex flex-col gap-4 border-b border-emerald/10 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-body text-xs font-semibold uppercase tracking-wider text-ink/40">
                        Sipariş
                      </p>

                      <h2 className="mt-1 font-display text-xl font-bold text-emerald-dark">
                        {order.order_number}
                      </h2>

                      <p className="mt-1 font-body text-xs text-ink/40">
                        {new Date(
                          order.created_at
                        ).toLocaleString("tr-TR")}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="inline-flex items-center gap-2 rounded-full bg-emerald/10 px-4 py-2 font-body text-xs font-bold text-emerald-dark">
                        <StatusIcon className="h-4 w-4" />
                        {status.text}
                      </div>

                      <div className="font-display text-2xl font-bold text-emerald-dark">
                        {order.currency}
                        {Number(order.total_price).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 p-6 lg:grid-cols-2">
                    <div>
                      <h3 className="font-display text-lg font-bold text-emerald-dark">
                        Müşteri Bilgileri
                      </h3>

                      <div className="mt-4 space-y-2 font-body text-sm">
                        <p>
                          <span className="font-semibold">
                            Ad Soyad:
                          </span>{" "}
                          {order.customer_name}
                        </p>

                        <p>
                          <span className="font-semibold">
                            Telefon:
                          </span>{" "}
                          {order.customer_phone}
                        </p>

                        <p>
                          <span className="font-semibold">
                            E-posta:
                          </span>{" "}
                          {order.customer_email}
                        </p>

                        <p className="break-words">
                          <span className="font-semibold">
                            Adres:
                          </span>{" "}
                          {order.customer_address}
                        </p>
                      </div>

                      <div className="mt-6">
                        <label
                          htmlFor={`status-${order.id}`}
                          className="font-body text-sm font-semibold text-emerald-dark"
                        >
                          Sipariş Durumu
                        </label>

                        <select
                          id={`status-${order.id}`}
                          value={order.status}
                          disabled={updatingId === order.id}
                          onChange={(event) =>
                            void updateStatus(
                              order.id,
                              event.target.value
                            )
                          }
                          className="mt-2 w-full rounded-xl border border-emerald/20 bg-white px-4 py-3 font-body text-sm text-emerald-dark outline-none disabled:cursor-wait disabled:opacity-50"
                        >
                          {statusOptions.map((option) => (
                            <option
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </option>
                          ))}
                        </select>

                        {updatingId === order.id && (
                          <p className="mt-2 flex items-center gap-2 font-body text-xs text-ink/50">
                            <RefreshCw className="h-3 w-3 animate-spin" />
                            Durum güncelleniyor...
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display text-lg font-bold text-emerald-dark">
                        Ürünler
                      </h3>

                      <div className="mt-4 space-y-3">
                        {items.map((item, index) => (
                          <div
                            key={`${item.id}-${index}`}
                            className="flex items-center justify-between rounded-2xl bg-emerald/5 p-3"
                          >
                            <div>
                              <p className="font-body text-sm font-semibold text-emerald-dark">
                                {item.name}
                              </p>

                              <p className="mt-1 font-body text-xs text-ink/45">
                                {item.quantity} adet
                              </p>
                            </div>

                            <p className="font-body text-sm font-bold text-emerald-dark">
                              {item.currency}
                              {Number(item.subtotal).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}