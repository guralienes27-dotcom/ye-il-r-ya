"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

export function useFavorites() {
  const { user } = useAuth();
  const router = useRouter();

  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const userRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(
      userRef,
      (snapshot) => {
        const data = snapshot.data();

        const list = Array.isArray(data?.favorites)
          ? (data.favorites as string[])
          : [];

        setFavorites(list);
        setLoading(false);
      },
      (error) => {
        console.error("Favoriler yüklenemedi:", error);
        setFavorites([]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const isFavorite = useCallback(
    (productId: string) => {
      return favorites.includes(productId);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (productId: string) => {
      if (!user) {
        router.push("/login");
        return;
      }

      const userRef = doc(db, "users", user.uid);

      const alreadyFavorite = favorites.includes(productId);

      setPending(productId);

      try {
        await updateDoc(userRef, {
          favorites: alreadyFavorite
            ? arrayRemove(productId)
            : arrayUnion(productId),
        });
      } catch (error) {
        console.error("Favori güncellenemedi:", error);
      } finally {
        setPending(null);
      }
    },
    [user, favorites, router]
  );

  const isPending = useCallback(
    (productId: string) => {
      return pending === productId;
    },
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