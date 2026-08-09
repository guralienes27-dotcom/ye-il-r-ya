import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyChooseUs from "@/components/WhyChooseUs";
import Reviews from "@/components/Reviews";
import InstagramGallery from "@/components/InstagramGallery";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden bg-cream">
      <Navbar />
      <Hero />
      <FeaturedProducts />
      <WhyChooseUs />
      <Reviews />
      <InstagramGallery />
      <Footer />
    </main>
  );
}