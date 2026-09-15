"use client";

import { useCallback, useEffect, useState } from "react";
 import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const FAVORITES_KEY = "yesilruya_favorites";

export function useFavorites() {
  const { user } = useAuth();
  const router = useRouter();

  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      }
    } catch (error) {
      console.error("Favoriler yüklenemedi:", error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
    }
  }, [user]);

  const isFavorite = useCallback(
    (productId: string) => favorites.includes(productId),
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (productId: string) => {
      if (!user) {
        router.push("/login");
        return;
       }

       setPending(productId);

      try {
        setFavorites((current) => {
          const next = current.includes(productId)
            ? current.filter((id) => id !== productId)
            : [...current, productId];

          localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));

          return next;
        });
      } finally {
        setPending(null);
      }
    },
    [user, router]
  );

  const isPending = useCallback(
    (productId: string) => pending === productId,
    [pending]
  );

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    loading,
    isPending,
  };
}