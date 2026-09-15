"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

 import type { UserProfile } from "@/types";

interface LocalUser {
  uid: string;
  email: string;
  displayName?: string | null;
}

interface AuthContextValue {
  user: LocalUser | null;
  profile: UserProfile | null;
  loading: boolean;

  signUp: (
    fullName: string,
    email: string,
    phone: string,
    password: string
  ) => Promise<void>;

  signIn: (email: string, password: string) => Promise<void>;

  signOutUser: () => Promise<void>;

  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const USER_KEY = "yesilruya_user";
const PROFILE_KEY = "yesilruya_profile";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(USER_KEY);
      const savedProfile = localStorage.getItem(PROFILE_KEY);

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    } catch (error) {
      console.error("Kullanıcı bilgileri okunamadı:", error);
      setUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = async (
    fullName: string,
    email: string,
    phone: string,
    password: string
  ) => {
    if (!fullName.trim()) {
      throw new Error("Ad soyad zorunludur.");
    }

    if (!email.trim()) {
      throw new Error("E-posta zorunludur.");
    }

    if (!password || password.length < 6) {
      throw new Error("Şifre en az 6 karakter olmalıdır.");
    }

    const uid = `local-${Date.now()}`;

    const newUser: LocalUser = {
      uid,
      email,
       displayName: fullName,
     };

    const newProfile: UserProfile = {
      uid,
      fullName,
      email,
      phone,
      createdAt: new Date().toISOString(),
      favorites: [],
      addresses: [],
      orders: [],
    };

    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    localStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile));

    setUser(newUser);
    setProfile(newProfile);
  };

  const signIn = async (email: string, password: string) => {
    const savedUser = localStorage.getItem(USER_KEY);
    const savedProfile = localStorage.getItem(PROFILE_KEY);

    if (!savedUser || !savedProfile) {
      throw new Error("Kayıtlı kullanıcı bulunamadı.");
    }

    const parsedUser: LocalUser = JSON.parse(savedUser);
    const parsedProfile: UserProfile = JSON.parse(savedProfile);

    if (parsedUser.email !== email) {
      throw new Error("E-posta veya şifre hatalı.");
    }

    if (!password) {
      throw new Error("Şifre zorunludur.");
    }

    setUser(parsedUser);
    setProfile(parsedProfile);
  };

  const signOutUser = async () => {
    setUser(null);
    setProfile(null);
   };

  const resetPassword = async (email: string) => {
    if (!email.trim()) {
      throw new Error("E-posta adresi zorunludur.");
    }

    throw new Error(
      "Şifre sıfırlama sistemi henüz kendi veritabanımıza bağlanmadı."
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signUp,
        signIn,
        signOutUser,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return ctx;
}