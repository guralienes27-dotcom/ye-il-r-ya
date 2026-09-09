"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  type User,
} from "firebase/auth";

import { auth } from "@/lib/firebase";
import type { UserProfile } from "@/types";

interface AuthContextValue {
  user: User | null;
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const savedProfile = localStorage.getItem(
            `profile_${firebaseUser.uid}`
          );

          if (savedProfile) {
            setProfile(JSON.parse(savedProfile));
          } else {
            const fallbackProfile: UserProfile = {
              uid: firebaseUser.uid,
              fullName: firebaseUser.displayName || "Kullanıcı",
              email: firebaseUser.email || "",
              phone: "",
              createdAt: new Date().toISOString(),
              favorites: [],
              addresses: [],
              orders: [],
            };

            setProfile(fallbackProfile);
          }
        } catch (error) {
          console.error("Profil bilgileri okunamadı:", error);
          setProfile(null);
        }
      } else {
        setProfile(null);
      }

      // Kullanıcı kontrolü bitti.
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (
    fullName: string,
    email: string,
    phone: string,
    password: string
  ) => {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(credential.user, {
      displayName: fullName,
    });

    const newProfile: UserProfile = {
      uid: credential.user.uid,
      fullName,
      email,
      phone,
      createdAt: new Date().toISOString(),
      favorites: [],
      addresses: [],
      orders: [],
    };

    localStorage.setItem(
      `profile_${credential.user.uid}`,
      JSON.stringify(newProfile)
    );

    setUser(credential.user);
    setProfile(newProfile);
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = async () => {
    setProfile(null);
    await firebaseSignOut(auth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
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