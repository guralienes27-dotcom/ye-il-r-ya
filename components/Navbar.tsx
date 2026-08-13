"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  User,
  LogOut,
} from "lucide-react";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/lib/cart-context";
import CartDrawer from "@/components/CartDrawer";

interface NavLink {
  label: string;
  href: string;
  id: string;
}

const navLinks: NavLink[] = [
  { label: "Ana Sayfa", href: "/#home", id: "home" },
  { label: "Ürünler", href: "/#products", id: "products" },
  { label: "Hikayemiz", href: "/#why-us", id: "why-us" },
  { label: "İletişim", href: "/#footer", id: "footer" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");

  const searchInputRef = useRef<HTMLInputElement>(null);
  const { totalItems, openCart } = useCart();
  const favoritesCount = 3;
  const { user, profile, signOutUser } = useAuth();

  // Sticky glass + shrink behaviour on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is in view to underline the active menu item
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu whenever the viewport grows past the lg breakpoint
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Escape key closes search and mobile menu
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const toggleSearch = useCallback(() => {
    setSearchOpen((prev) => {
      const next = !prev;
      if (next) {
        // Focus the input once it has finished expanding
        window.setTimeout(() => searchInputRef.current?.focus(), 280);
      }
      return next;
    });
  }, []);

  return (
    <header
     className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${ 
        scrolled ? "glass shadow-soft py-2.5" : "bg-transparent py-5"
      }`}
      style={scrolled ? { background: "rgba(14, 75, 60, 0.72)" } : undefined}
    >
      <nav
        aria-label="Ana navigasyon"
        className="relative mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10"
      >
        {/* Logo — left */}
        <Link
  href="/#home"
          aria-label="Cennet Çamuru & Gerebiç — Ana sayfa"
          className="flex shrink-0 items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-dark"
        >
          <span
            className={`flex items-center justify-center rounded-full bg-gold-sheen shadow-gold transition-all duration-500 ${
              scrolled ? "h-8 w-8" : "h-10 w-10"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              className={`text-emerald-dark transition-all duration-500 ${
                scrolled ? "h-4 w-4" : "h-5 w-5"
              }`}
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2c-3 4-7 7-7 12a7 7 0 0014 0c0-5-4-8-7-12z" />
            </svg>
          </span>
          <span className="flex flex-col leading-none">
            <span
              className={`font-display font-semibold tracking-wide text-cream transition-all duration-500 ${
                scrolled ? "text-base" : "text-lg"
              }`}
            >
              Yeşil Rüya
            </span>
            <span className="font-accent text-xs italic tracking-widest text-gold-light">
              Cennet Çamuru & Gerebiç 
            </span>
          </span>
        </Link>

        {/* Center menu — desktop */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 lg:flex">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className="group relative py-2 font-body text-sm font-medium tracking-wide text-cream/85 transition-colors duration-300 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-dark"
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-0.5 left-0 h-[2px] w-full origin-left rounded-full bg-gold-sheen transition-transform duration-300 ease-out ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Actions — right */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Search */}
          <div className="hidden items-center sm:flex">
            <div
              className={`flex items-center overflow-hidden rounded-full bg-cream/10 transition-all duration-300 ease-out ${
                searchOpen ? "w-48 px-3" : "w-9 px-0"
              }`}
            >
              <button
                type="button"
                aria-label={searchOpen ? "Aramayı kapat" : "Ara"}
                aria-expanded={searchOpen}
                onClick={toggleSearch}
                className="shrink-0 rounded-full p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <Search className="h-4 w-4 text-cream" />
              </button>
              <input
                ref={searchInputRef}
                type="text"
                aria-label="Tatlı ara"
                placeholder="Tatlı ara..."
                tabIndex={searchOpen ? 0 : -1}
                className={`w-full bg-transparent text-sm text-cream outline-none placeholder:text-cream/50 transition-opacity duration-300 ${
                  searchOpen ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </div>

          {/* Favorites */}
          <button
            type="button"
            aria-label={`Favoriler${favoritesCount ? `, ${favoritesCount} ürün` : ""}`}
            className="relative hidden rounded-full p-2.5 transition-colors duration-300 hover:bg-cream/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:inline-flex"
          >
            <Heart className="h-5 w-5 text-cream" />
            {favoritesCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-emerald-dark">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            type="button"
            aria-label={`Sepet${totalItems ? `, ${totalItems} ürün` : ""}`}
            onClick={openCart}
            className="relative z-10 flex h-11 w-11 touch-manipulation items-center justify-center rounded-full transition-colors duration-300 hover:bg-cream/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <ShoppingBag className="h-5 w-5 text-cream" />
            {totalItems > 0 && (
              <span
                key={totalItems}
                className="absolute -right-0.5 -top-0.5 flex h-4 w-4 animate-fade-up items-center justify-center rounded-full bg-gold text-[10px] font-bold text-emerald-dark"
              >
                {totalItems}
              </span>
            )}
          </button>

         {user ? (
  <div className="hidden items-center gap-3 sm:flex">
    <Link
      href="/profile"
      className="flex items-center gap-2 rounded-full bg-cream/10 px-4 py-2 text-sm text-cream transition hover:bg-cream/20"
    >
      <User className="h-4 w-4" />
      {profile?.fullName || user.displayName || "Hesabım"}
    </Link>

    <button
      onClick={signOutUser}
      className="rounded-full bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
    >
      <LogOut className="h-4 w-4" />
    </button>
  </div>
) : (
  <Link
    href="/login"
    className="hidden rounded-full bg-gold-sheen px-5 py-2 font-body text-sm font-semibold text-emerald-dark shadow-gold sm:block"
  >
    Giriş Yap
  </Link>
)}

          {/* Hamburger — mobile */}
          <button
            type="button"
            aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="relative z-10 flex h-11 w-11 touch-manipulation items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold lg:hidden"
          >
            <Menu
              className={`h-6 w-6 text-cream transition-all duration-300 ${
                menuOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
              }`}
            />
            <X
              className={`absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-cream transition-all duration-300 ${
                menuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="region"
        aria-label="Mobil menü"
        className={`grid transition-all duration-300 ease-out lg:hidden ${
  menuOpen
    ? "grid-rows-[1fr] opacity-100 pointer-events-auto"
    : "grid-rows-[0fr] opacity-0 pointer-events-none"
}`} 
      >
        <div className="overflow-hidden">
          <div className="mx-6 mt-4 flex flex-col gap-1 rounded-2xl bg-emerald-dark p-4 shadow-soft">
            {navLinks.map((link, i) => {
              const isActive = activeId === link.id;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
                  }}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 font-body text-sm font-medium transition-all duration-300 ${
                    menuOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                  } ${
                    isActive
                      ? "bg-cream/10 text-gold-light"
                      : "text-cream/90 hover:bg-cream/10"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-light" aria-hidden="true" />
                  )}
                </Link>
              );
            })}

            <div className="mt-3 flex items-center gap-2 border-t border-cream/10 pt-4">
              <button
                type="button"
                aria-label="Ara"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20"
              >
                <Search className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label={`Favoriler${favoritesCount ? `, ${favoritesCount} ürün` : ""}`}
                className="relative flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20"
              >
                <Heart className="h-4 w-4" />
                {favoritesCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-emerald-dark">
                    {favoritesCount}
                  </span>
                )}
              </button>
              {user ? (
  <Link
    href="/profile"
    className="ml-auto rounded-full bg-gold-sheen px-5 py-2.5 font-body text-sm font-semibold text-emerald-dark shadow-gold"
  >
    Hesabım
  </Link>
) : (
  <Link
    href="/login"
    className="ml-auto rounded-full bg-gold-sheen px-5 py-2.5 font-body text-sm font-semibold text-emerald-dark shadow-gold"
  >
    Giriş Yap
  </Link>
)}
               
            </div>
          </div>
        </div>
      </div>

      <CartDrawer />
    </header>
  );
}
