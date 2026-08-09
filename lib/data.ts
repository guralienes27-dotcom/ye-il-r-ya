import { FeatureItem, InstagramPost, Product, Review } from "@/types";

/**
 * Store product shape — extends the shared Product type (id, name,
 * description, price, currency, image, rating, badge?) with catalog
 * fields used by listing/filtering and the detail page. Kept local to
 * this file so every other module can keep importing `Product`.
 */
export interface StoreProduct extends Product {
  slug: string;
  category: "Cennet Çamuru" | "Künefe" | "Kadayıf" | "Katmer";
  shortDescription: string;
  featured: boolean;
  reviews: number;
}

const img = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=800&q=80`;

export const products: StoreProduct[] = [
  {
    id: "cennet-camuru",
    slug: "cennet-camuru",
    name: "Cennet Çamuru",
    category: "Cennet Çamuru",
    price: 200,
    currency: "₺",
    shortDescription: "Antep fıstıklı, ipeksi kıvamlı imza cennet çamuru.",
    description:
      "Antep fıstığı ve %70 bitter çikolata ile hazırlanan, ipeksi kıvamlı imza tatlımız. Her parti elde, günlük taze üretilir.",
    image: img("photo-1606313564200-e75d5e30476c"),
    featured: true,
    rating: 5,
    reviews: 214,
  },
  {
    id: "peynirli-kunefe",
    slug: "peynirli-kunefe",
    name: "Peynirli Künefe",
    category: "Künefe",
    price: 200,
    currency: "₺",
    shortDescription: "Sıcak servis edilen, eriyen peynirli klasik künefe.",
    description:
      "Kadayıf teli ve özel künefe peyniriyle hazırlanan, sıcak servis edilen geleneksel Antep künefesi.",
    image: img("photo-1606312619070-d48b4c652a52"),
    featured: false,
    rating: 5,
    reviews: 158,
  },
  {
    id: "hasir-kadayif",
    slug: "hasir-kadayif",
    name: "Hasır Kadayıf",
    category: "Kadayıf",
    price: 250,
    currency: "₺",
    shortDescription: "Fıstık dolgulu, hasır dokulu çıtır kadayıf.",
    description:
      "İnce çekilmiş kadayıf telinin hasır şeklinde örülüp fıstıkla doldurulmasıyla hazırlanan çıtır klasik.",
    image: img("photo-1571877227200-a0d98ea607e9"),
    featured: false,
    rating: 4,
    reviews: 96,
  },
  {
    id: "fistikli-kadayif",
    slug: "fistikli-kadayif",
    name: "Fıstıklı Kadayıf",
    category: "Kadayıf",
    price: 250,
    currency: "₺",
    shortDescription: "Bol Antep fıstıklı, şerbetli geleneksel kadayıf.",
    description:
      "Bol Antep fıstığı ile katman katman hazırlanan, kıvamında şerbetlenmiş geleneksel kadayıf tatlısı.",
    image: img("photo-1541599468348-e96984315921"),
    featured: true,
    rating: 5,
    reviews: 187,
  },
  {
    id: "special-kunefe",
    slug: "special-kunefe",
    name: "Special Künefe",
    category: "Künefe",
    price: 270,
    currency: "₺",
    shortDescription: "Fıstık ve dondurma eşliğinde özel sunum künefe.",
    description:
      "Klasik künefenin üzerine bol Antep fıstığı ve isteğe bağlı dondurma ile zenginleştirilen özel sunumumuz.",
    image: img("photo-1488477181946-6428a0291777"),
    featured: true,
    rating: 5,
    reviews: 132,
  },
  {
    id: "burma-kadayif",
    slug: "burma-kadayif",
    name: "Burma Kadayıf",
    category: "Kadayıf",
    price: 250,
    currency: "₺",
    shortDescription: "Fıstık dolgulu, burma şeklinde sarılmış kadayıf.",
    description:
      "Kadayıf telinin fıstık dolgusu etrafında burularak sarılmasıyla hazırlanan, hafif şerbetli klasik.",
    image: img("photo-1587314168485-3236d6710814"),
    featured: false,
    rating: 4,
    reviews: 74,
  },
  {
    id: "billuriye",
    slug: "billuriye",
    name: "Billuriye",
    category: "Kadayıf",
    price: 350,
    currency: "₺",
    shortDescription: "Cam gibi parlayan, yoğun fıstıklı özel kadayıf.",
    description:
      "İnce kadayıf katmanları arasına bolca fıstık serpiştirilerek hazırlanan, adını billur parıltısından alan prestij tatlımız.",
    image: img("photo-1606313564200-e75d5e30476c"),
    featured: false,
    rating: 5,
    reviews: 61,
  },
  {
    id: "antep-katmeri",
    slug: "antep-katmeri",
    name: "Antep Katmeri",
    category: "Katmer",
    price: 500,
    currency: "₺",
    shortDescription: "Taze kaymak ve fıstıkla hazırlanan imza katmer.",
    description:
      "İnce açılmış hamurun taze kaymak ve bol Antep fıstığı ile katmer katmer hazırlandığı, sabah kahvaltısının prestij klasiği.",
    image: img("photo-1606312619070-d48b4c652a52"),
    featured: true,
    rating: 5,
    reviews: 143,
  },
  {
    id: "simit-katmer",
    slug: "simit-katmer",
    name: "Simit Katmer",
    category: "Katmer",
    price: 500,
    currency: "₺",
    shortDescription: "Simit şeklinde sarılmış, fıstıklı özel katmer.",
    description:
      "Geleneksel katmer hamurunun simit formunda sarılıp fıstıkla doldurulmasıyla hazırlanan görsel ve lezzet şöleni.",
    image: img("photo-1571877227200-a0d98ea607e9"),
    featured: false,
    rating: 4,
    reviews: 52,
  },
  {
    id: "muska-katmer",
    slug: "muska-katmer",
    name: "Muska Katmer",
    category: "Katmer",
    price: 350,
    currency: "₺",
    shortDescription: "Üçgen muska formunda çıtır fıstıklı katmer.",
    description:
      "İnce hamurun üçgen muska formunda katlanıp fıstıkla doldurulmasıyla hazırlanan, tek lokmalık çıtır seçki.",
    image: img("photo-1541599468348-e96984315921"),
    featured: false,
    rating: 4,
    reviews: 45,
  },
  {
    id: "kilis-katmeri",
    slug: "kilis-katmeri",
    name: "Kilis Katmeri",
    category: "Katmer",
    price: 250,
    currency: "₺",
    shortDescription: "Kilis usulü ince açılmış, hafif tatlı katmer.",
    description:
      "Kilis yöresinin geleneksel tarifiyle ince açılan hamurun hafif şekerlenmesiyle hazırlanan zarif katmer.",
    image: img("photo-1488477181946-6428a0291777"),
    featured: false,
    rating: 4,
    reviews: 38,
  },
];

export const features: FeatureItem[] = [
  {
    id: "fresh-daily",
    title: "Her Gün Taze",
    description:
      "Tüm tatlılarımız sipariş gününde, kendi mutfağımızda taze olarak hazırlanır.",
    icon: "leaf",
  },
  {
    id: "original-recipe",
    title: "Orijinal Reçete",
    description:
      "Nesillerdir aktarılan özgün Antep tarifleri, modern sunumla buluşuyor.",
    icon: "recipe",
  },
  {
    id: "fast-delivery",
    title: "Hızlı Teslimat",
    description:
      "Soğuk zincir korunarak özel paketleme ile aynı gün kapınıza ulaştırılır.",
    icon: "delivery",
  },
  {
    id: "secure-payment",
    title: "Güvenli Ödeme",
    description:
      "256-bit SSL şifreleme ile korunan, tamamen güvenli ödeme altyapısı.",
    icon: "secure",
  },
];

export const reviews: Review[] = [
  {
    id: "review-1",
    name: "Elif Yıldırım",
    location: "İstanbul",
    quote:
      "Hayatımda tattığım en zarif tatlı deneyimi. Her kaşıkta ayrı bir denge var, sunumu da bir o kadar şık.",
    rating: 5,
    initials: "EY",
  },
  {
    id: "review-2",
    name: "Mert Kaya",
    location: "Ankara",
    quote:
      "Antep katmerini annemin doğum günü için sipariş ettim, herkes hâlâ bahsediyor. Kesinlikle tekrar alacağım.",
    rating: 5,
    initials: "MK",
  },
  {
    id: "review-3",
    name: "Selin Demir",
    location: "İzmir",
    quote:
      "Fıstık oranı ve kıvamı tam kararında. Paketleme de içerik kadar özenli, tam bir hediyelik deneyim.",
    rating: 5,
    initials: "SD",
  },
  {
    id: "review-4",
    name: "Ahmet Şahin",
    location: "Bursa",
    quote:
      "Aynı gün teslimat sözü tutuldu, ürün buz gibi taze geldi. Artık özel günlerin vazgeçilmezi.",
    rating: 4,
    initials: "AŞ",
  },
];

export const instagramPosts: InstagramPost[] = [
  {
    id: "insta-1",
    image:
      "https://images.unsplash.com/photo-1541599468348-e96984315921?auto=format&fit=crop&w=500&q=80",
    likes: 842,
  },
  {
    id: "insta-2",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80",
    likes: 1204,
  },
  {
    id: "insta-3",
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=500&q=80",
    likes: 967,
  },
  {
    id: "insta-4",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500&q=80",
    likes: 733,
  },
  {
    id: "insta-5",
    image:
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=500&q=80",
    likes: 1088,
  },
  {
    id: "insta-6",
    image:
      "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=500&q=80",
    likes: 654,
  },
];
