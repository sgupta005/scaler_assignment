import { prisma } from "./db.js";

// ─── Image helper ───────────────────────────────────────────────────────────
// Using Unsplash for high-quality, realistic product images.
// Each URL is hand-picked per product type.

const img = {
  // ── Mobiles ────────────────────────────────────────────────────────────────
  iphone15Pro: [
    "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1696446700062-1a9dfa54c4c2?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1591337676887-a217a6c5e926?w=400&h=400&fit=crop",
  ],
  samsungS24: [
    "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400&h=400&fit=crop",
  ],
  pixel8: [
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
  ],
  onePlus12: [
    "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop",
  ],
  redmiNote13: [
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop",
  ],
  realmeNarzo: [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&h=400&fit=crop",
  ],

  // ── Mobile Accessories ─────────────────────────────────────────────────────
  mobileCase: [
    "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop",
  ],
  screenGuard: [
    "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&h=400&fit=crop",
  ],
  charger: [
    "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&h=400&fit=crop",
  ],
  powerBank: [
    "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
  ],

  // ── Laptops ────────────────────────────────────────────────────────────────
  macbookAir: [
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
  ],
  dellXps: [
    "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop",
  ],
  hpPavilion: [
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=400&fit=crop",
  ],
  lenovoIdeapad: [
    "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=400&h=400&fit=crop",
  ],
  asusVivobook: [
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=400&fit=crop",
  ],

  // ── Headphones & Speakers ──────────────────────────────────────────────────
  sonyWH1000: [
    "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop",
  ],
  airpodsPro: [
    "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1588423771073-b8903fde1c68?w=400&h=400&fit=crop",
  ],
  jblCharge5: [
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
  ],
  boatRockerz: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
  ],
  samsungBuds: [
    "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&h=400&fit=crop",
  ],

  // ── Fashion – Men ──────────────────────────────────────────────────────────
  mensTshirt: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop",
  ],
  mensShirt: [
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop",
  ],
  mensJeans: [
    "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
  ],
  mensJacket: [
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
  ],
  mensSneakers: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop",
  ],

  // ── Fashion – Women ────────────────────────────────────────────────────────
  womensDress: [
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop",
  ],
  womensKurti: [
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=400&fit=crop",
  ],
  womensSaree: [
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop",
  ],
  womensHeels: [
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
  ],
  womensHandbag: [
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
  ],

  // ── Home & Furniture ───────────────────────────────────────────────────────
  sofa: [
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=400&fit=crop",
  ],
  bedsheet: [
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop",
  ],
  curtain: [
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=400&fit=crop",
  ],
  wallClock: [
    "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&h=400&fit=crop",
  ],
  studyTable: [
    "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop",
  ],
  bookshelf: [
    "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400&h=400&fit=crop",
  ],
  diningTable: [
    "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=400&fit=crop",
  ],

  // ── Kitchen ────────────────────────────────────────────────────────────────
  mixer: [
    "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=400&fit=crop",
  ],
  cookware: [
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
  ],
  waterBottle: [
    "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
  ],
  lunchBox: [
    "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=400&fit=crop",
  ],

  // ── Appliances ─────────────────────────────────────────────────────────────
  tv: [
    "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400&h=400&fit=crop",
  ],
  washingMachine: [
    "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=400&fit=crop",
  ],
  ac: [
    "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=400&h=400&fit=crop",
  ],
  refrigerator: [
    "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop",
  ],
  microwave: [
    "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&h=400&fit=crop",
  ],

  // ── Beauty ─────────────────────────────────────────────────────────────────
  lipstick: [
    "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
  ],
  perfume: [
    "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=400&fit=crop",
  ],
  faceCream: [
    "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
  ],
  shampoo: [
    "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&h=400&fit=crop",
  ],
  sunscreen: [
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
  ],
  hairDryer: [
    "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=400&h=400&fit=crop",
  ],
  trimmer: [
    "https://images.unsplash.com/photo-1621607512022-6aecc149587d?w=400&h=400&fit=crop",
  ],

  // ── Toys & Baby ────────────────────────────────────────────────────────────
  lego: [
    "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=400&h=400&fit=crop",
  ],
  boardGame: [
    "https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=400&h=400&fit=crop",
  ],
  remoteCar: [
    "https://images.unsplash.com/photo-1581235707960-ef60775af0df?w=400&h=400&fit=crop",
  ],
  babyCare: [
    "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop",
  ],
  diapers: [
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
  ],

  // ── Grocery ────────────────────────────────────────────────────────────────
  rice: [
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
  ],
  oil: [
    "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop",
  ],
  tea: [
    "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
  ],
  snack: [
    "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=400&fit=crop",
  ],
  chocolate: [
    "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=400&fit=crop",
  ],

  // ── Smartwatches ───────────────────────────────────────────────────────────
  appleWatch: [
    "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop",
  ],
  fireboltt: [
    "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop",
  ],
  noise: [
    "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&h=400&fit=crop",
  ],
} as const;

// ─── Types for seed data ────────────────────────────────────────────────────
interface CategorySeed {
  name: string;
  slug: string;
  children: {
    name: string;
    slug: string;
  }[];
}

interface ProductSeed {
  name: string;
  description: string;
  price: number;
  mrp: number;
  stock: number;
  categorySlug: string;
  brand: string;
  specifications: Record<string, string>;
  images: readonly string[];
}

// ─── Categories ─────────────────────────────────────────────────────────────
const categories: CategorySeed[] = [
  {
    name: "Mobiles",
    slug: "mobiles",
    children: [
      { name: "Smartphones", slug: "smartphones" },
      { name: "Mobile Accessories", slug: "mobile-accessories" },
    ],
  },
  {
    name: "Electronics",
    slug: "electronics",
    children: [
      { name: "Laptops", slug: "laptops" },
      { name: "Headphones & Speakers", slug: "headphones-speakers" },
      { name: "Smartwatches", slug: "smartwatches" },
    ],
  },
  {
    name: "Fashion",
    slug: "fashion",
    children: [
      { name: "Men's Clothing", slug: "mens-clothing" },
      { name: "Women's Clothing", slug: "womens-clothing" },
      { name: "Footwear", slug: "footwear" },
    ],
  },
  {
    name: "Home & Furniture",
    slug: "home-furniture",
    children: [
      { name: "Furniture", slug: "furniture" },
      { name: "Home Decor", slug: "home-decor" },
      { name: "Kitchen & Dining", slug: "kitchen-dining" },
    ],
  },
  {
    name: "Appliances",
    slug: "appliances",
    children: [
      { name: "Televisions", slug: "televisions" },
      { name: "Washing Machines", slug: "washing-machines" },
      { name: "Air Conditioners", slug: "air-conditioners" },
      { name: "Refrigerators", slug: "refrigerators" },
    ],
  },
  {
    name: "Beauty",
    slug: "beauty",
    children: [
      { name: "Skincare", slug: "skincare" },
      { name: "Haircare", slug: "haircare" },
      { name: "Fragrances", slug: "fragrances" },
      { name: "Grooming", slug: "grooming" },
    ],
  },
  {
    name: "Toys & Baby",
    slug: "toys-baby",
    children: [
      { name: "Toys", slug: "toys" },
      { name: "Baby Care", slug: "baby-care" },
    ],
  },
  {
    name: "Grocery",
    slug: "grocery",
    children: [
      { name: "Staples", slug: "staples" },
      { name: "Snacks & Beverages", slug: "snacks-beverages" },
    ],
  },
];

// ─── Products ───────────────────────────────────────────────────────────────
const products: ProductSeed[] = [
  // ── Smartphones ────────────────────────────────────────────────────────────
  {
    name: "Apple iPhone 15 Pro (256 GB) - Natural Titanium",
    description:
      "iPhone 15 Pro. Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.",
    price: 134900,
    mrp: 149900,
    stock: 25,
    categorySlug: "smartphones",
    brand: "Apple",
    specifications: {
      RAM: "8 GB",
      Storage: "256 GB",
      Display: "6.1 inch Super Retina XDR OLED",
      Processor: "A17 Pro Bionic",
      Camera: "48 MP + 12 MP + 12 MP",
      Battery: "3274 mAh",
      OS: "iOS 17",
    },
    images: img.iphone15Pro,
  },
  {
    name: "Samsung Galaxy S24 Ultra 5G (Titanium Gray, 256 GB)",
    description:
      "Galaxy AI is here. Search like never before, Icons unleash Icons, Icons Icons Icons Icons. The most powerful Galaxy experience yet with the embedded S Pen.",
    price: 129999,
    mrp: 144999,
    stock: 30,
    categorySlug: "smartphones",
    brand: "Samsung",
    specifications: {
      RAM: "12 GB",
      Storage: "256 GB",
      Display: "6.8 inch Dynamic AMOLED 2X",
      Processor: "Snapdragon 8 Gen 3",
      Camera: "200 MP + 50 MP + 12 MP + 10 MP",
      Battery: "5000 mAh",
      OS: "Android 14",
    },
    images: img.samsungS24,
  },
  {
    name: "Google Pixel 8 Pro (Obsidian, 128 GB)",
    description:
      "Google Pixel 8 Pro with the best of Google AI built in. Advanced photo and video capabilities, powered by Tensor G3.",
    price: 84999,
    mrp: 106999,
    stock: 20,
    categorySlug: "smartphones",
    brand: "Google",
    specifications: {
      RAM: "12 GB",
      Storage: "128 GB",
      Display: "6.7 inch LTPO OLED",
      Processor: "Google Tensor G3",
      Camera: "50 MP + 48 MP + 48 MP",
      Battery: "5050 mAh",
      OS: "Android 14",
    },
    images: img.pixel8,
  },
  {
    name: "OnePlus 12 (Flowy Emerald, 256 GB)",
    description:
      "OnePlus 12 – The flagship killer returns with Snapdragon 8 Gen 3, Hasselblad camera tuning, and 100W SUPERVOOC charging.",
    price: 64999,
    mrp: 69999,
    stock: 40,
    categorySlug: "smartphones",
    brand: "OnePlus",
    specifications: {
      RAM: "12 GB",
      Storage: "256 GB",
      Display: "6.82 inch LTPO AMOLED",
      Processor: "Snapdragon 8 Gen 3",
      Camera: "50 MP + 48 MP + 64 MP",
      Battery: "5400 mAh",
      OS: "OxygenOS 14 (Android 14)",
    },
    images: img.onePlus12,
  },
  {
    name: "Redmi Note 13 Pro+ 5G (Fusion Purple, 256 GB)",
    description:
      "Redmi Note 13 Pro+ 5G with 200MP camera, 120W HyperCharge, and 120Hz curved AMOLED display. Premium experience at an incredible price.",
    price: 29999,
    mrp: 33999,
    stock: 80,
    categorySlug: "smartphones",
    brand: "Xiaomi",
    specifications: {
      RAM: "8 GB",
      Storage: "256 GB",
      Display: "6.67 inch curved AMOLED 120Hz",
      Processor: "MediaTek Dimensity 7200 Ultra",
      Camera: "200 MP + 8 MP + 2 MP",
      Battery: "5000 mAh",
      OS: "MIUI 14 (Android 13)",
    },
    images: img.redmiNote13,
  },
  {
    name: "realme Narzo 70 Turbo 5G (Turbo Yellow, 128 GB)",
    description:
      "realme Narzo 70 Turbo – India's fastest segment smartphone with MediaTek Dimensity 7300 Energy, 45W fast charging.",
    price: 14999,
    mrp: 17999,
    stock: 100,
    categorySlug: "smartphones",
    brand: "realme",
    specifications: {
      RAM: "6 GB",
      Storage: "128 GB",
      Display: "6.67 inch FHD+ IPS LCD 120Hz",
      Processor: "MediaTek Dimensity 7300 Energy",
      Camera: "50 MP + 2 MP",
      Battery: "5000 mAh",
      OS: "realme UI 5.0 (Android 14)",
    },
    images: img.realmeNarzo,
  },

  // ── Mobile Accessories ─────────────────────────────────────────────────────
  {
    name: "Spigen Tough Armor Case for iPhone 15 Pro",
    description:
      "Military-grade drop protection with built-in kickstand. Dual-layer construction with Air Cushion technology at all corners.",
    price: 1499,
    mrp: 2499,
    stock: 200,
    categorySlug: "mobile-accessories",
    brand: "Spigen",
    specifications: {
      Material: "TPU + Polycarbonate",
      Compatibility: "iPhone 15 Pro",
      Features: "Kickstand, Military-grade protection",
    },
    images: img.mobileCase,
  },
  {
    name: "Samsung 25W USB-C Super Fast Charger",
    description:
      "Original Samsung 25W charger with USB-C to USB-C cable. Compatible with Galaxy S24, S23, Note series and more.",
    price: 1099,
    mrp: 1999,
    stock: 150,
    categorySlug: "mobile-accessories",
    brand: "Samsung",
    specifications: {
      Output: "25W Super Fast Charging",
      Input: "USB Type-C",
      Cable: "USB-C to USB-C (1m)",
    },
    images: img.charger,
  },
  {
    name: "Ambrane 20000 mAh Power Bank (Stylo Pro)",
    description:
      "20000 mAh Li-Polymer power bank with 22.5W fast charging. Charge 3 devices simultaneously with dual USB-A and USB-C ports.",
    price: 1299,
    mrp: 3499,
    stock: 120,
    categorySlug: "mobile-accessories",
    brand: "Ambrane",
    specifications: {
      Capacity: "20000 mAh",
      Output: "22.5W Fast Charging",
      Ports: "2x USB-A, 1x USB-C",
      Weight: "420g",
    },
    images: img.powerBank,
  },
  {
    name: "ZAGG InvisibleShield Screen Protector",
    description:
      "Premium tempered glass screen protector with anti-microbial treatment. Easy align tray included for bubble-free installation.",
    price: 799,
    mrp: 1499,
    stock: 300,
    categorySlug: "mobile-accessories",
    brand: "ZAGG",
    specifications: {
      Material: "Tempered Glass",
      Features: "Anti-microbial, Anti-fingerprint",
      Hardness: "9H",
    },
    images: img.screenGuard,
  },

  // ── Laptops ────────────────────────────────────────────────────────────────
  {
    name: "Apple MacBook Air M3 (15-inch, 16GB, 512GB) - Midnight",
    description:
      "The remarkably thin MacBook Air with the M3 chip brings even more speed to everything you do. Up to 18 hours of battery life.",
    price: 144900,
    mrp: 154900,
    stock: 15,
    categorySlug: "laptops",
    brand: "Apple",
    specifications: {
      Processor: "Apple M3 (8-core CPU, 10-core GPU)",
      RAM: "16 GB Unified Memory",
      Storage: "512 GB SSD",
      Display: "15.3 inch Liquid Retina",
      Battery: "Up to 18 hours",
      Weight: "1.51 kg",
    },
    images: img.macbookAir,
  },
  {
    name: "Dell XPS 15 (Intel Core i7-13700H, 16GB, 512GB SSD)",
    description:
      "Dell XPS 15 with InfinityEdge display, 13th Gen Intel Core i7, and NVIDIA GeForce RTX 4050. Premium craftsmanship meets performance.",
    price: 129990,
    mrp: 149990,
    stock: 12,
    categorySlug: "laptops",
    brand: "Dell",
    specifications: {
      Processor: "Intel Core i7-13700H",
      RAM: "16 GB DDR5",
      Storage: "512 GB NVMe SSD",
      Display: "15.6 inch 3.5K OLED",
      GPU: "NVIDIA GeForce RTX 4050",
      Weight: "1.86 kg",
    },
    images: img.dellXps,
  },
  {
    name: "HP Pavilion 15 (AMD Ryzen 7 7730U, 16GB, 512GB)",
    description:
      "HP Pavilion with AMD Ryzen 7, IPS anti-glare display, and long battery life. Perfect for work and entertainment.",
    price: 62990,
    mrp: 74490,
    stock: 25,
    categorySlug: "laptops",
    brand: "HP",
    specifications: {
      Processor: "AMD Ryzen 7 7730U",
      RAM: "16 GB DDR4",
      Storage: "512 GB NVMe SSD",
      Display: "15.6 inch FHD IPS",
      GPU: "AMD Radeon Graphics",
      Weight: "1.75 kg",
    },
    images: img.hpPavilion,
  },
  {
    name: "Lenovo IdeaPad Slim 3 (Intel i5-1335U, 8GB, 512GB)",
    description:
      "Lenovo IdeaPad Slim 3 – thin and light with 12th Gen Intel Core i5. Great for students and everyday productivity.",
    price: 45990,
    mrp: 61990,
    stock: 35,
    categorySlug: "laptops",
    brand: "Lenovo",
    specifications: {
      Processor: "Intel Core i5-1335U",
      RAM: "8 GB DDR4",
      Storage: "512 GB SSD",
      Display: "15.6 inch FHD IPS",
      GPU: "Intel Iris Xe",
      Weight: "1.62 kg",
    },
    images: img.lenovoIdeapad,
  },
  {
    name: "ASUS Vivobook 15 (AMD Ryzen 5 7520U, 8GB, 512GB)",
    description:
      "ASUS Vivobook 15 with NanoEdge display, military-grade durability, and ErgoLift hinge. Everyday computing made comfortable.",
    price: 38990,
    mrp: 52990,
    stock: 40,
    categorySlug: "laptops",
    brand: "ASUS",
    specifications: {
      Processor: "AMD Ryzen 5 7520U",
      RAM: "8 GB DDR4",
      Storage: "512 GB SSD",
      Display: "15.6 inch FHD",
      GPU: "AMD Radeon Graphics",
      Weight: "1.7 kg",
    },
    images: img.asusVivobook,
  },

  // ── Headphones & Speakers ──────────────────────────────────────────────────
  {
    name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    description:
      "Industry-leading noise cancellation with Auto NC Optimizer. Exceptional sound quality with 30-hour battery life.",
    price: 26990,
    mrp: 34990,
    stock: 30,
    categorySlug: "headphones-speakers",
    brand: "Sony",
    specifications: {
      Type: "Over-Ear Wireless",
      Driver: "30mm",
      ANC: "Yes (Auto NC Optimizer)",
      Battery: "30 hours",
      Connectivity: "Bluetooth 5.2, 3.5mm",
      Weight: "250g",
    },
    images: img.sonyWH1000,
  },
  {
    name: "Apple AirPods Pro (2nd Generation) with USB-C",
    description:
      "AirPods Pro with Active Noise Cancellation, Transparency mode, Adaptive Audio, and USB-C charging case with precision finding.",
    price: 20990,
    mrp: 24900,
    stock: 40,
    categorySlug: "headphones-speakers",
    brand: "Apple",
    specifications: {
      Type: "In-Ear True Wireless",
      ANC: "Active Noise Cancellation",
      Battery: "6 hours (30 with case)",
      Connectivity: "Bluetooth 5.3",
      Charging: "USB-C, MagSafe, Qi",
      "Water Resistance": "IPX4",
    },
    images: img.airpodsPro,
  },
  {
    name: "JBL Charge 5 Portable Bluetooth Speaker",
    description:
      "JBL Charge 5 with powerful JBL Pro Sound, deep bass, built-in powerbank, and IP67 waterproof/dustproof rating.",
    price: 13999,
    mrp: 17999,
    stock: 35,
    categorySlug: "headphones-speakers",
    brand: "JBL",
    specifications: {
      Type: "Portable Bluetooth Speaker",
      Output: "30W",
      Battery: "20 hours",
      "Water Resistance": "IP67",
      Connectivity: "Bluetooth 5.1",
      Features: "Powerbank, PartyBoost",
    },
    images: img.jblCharge5,
  },
  {
    name: "boAt Rockerz 450 Bluetooth On-Ear Headphones",
    description:
      "boAt Rockerz 450 with 40mm drivers, padded ear cushions, and up to 15 hours of playtime. Designed for everyday music lovers.",
    price: 1299,
    mrp: 3990,
    stock: 100,
    categorySlug: "headphones-speakers",
    brand: "boAt",
    specifications: {
      Type: "On-Ear Wireless",
      Driver: "40mm",
      Battery: "15 hours",
      Connectivity: "Bluetooth 4.2, AUX",
      Weight: "186g",
    },
    images: img.boatRockerz,
  },
  {
    name: "Samsung Galaxy Buds2 Pro (Graphite)",
    description:
      "Samsung Galaxy Buds2 Pro with Hi-Fi 24bit audio, intelligent ANC, and 360 Audio. Seamless Galaxy ecosystem integration.",
    price: 11999,
    mrp: 17999,
    stock: 45,
    categorySlug: "headphones-speakers",
    brand: "Samsung",
    specifications: {
      Type: "In-Ear True Wireless",
      ANC: "Intelligent Active Noise Cancellation",
      Battery: "5 hours (18 with case)",
      Connectivity: "Bluetooth 5.3",
      "Water Resistance": "IPX7",
    },
    images: img.samsungBuds,
  },

  // ── Smartwatches ───────────────────────────────────────────────────────────
  {
    name: "Apple Watch Series 9 GPS (41mm, Midnight Aluminium)",
    description:
      "Apple Watch Series 9 with S9 SiP, Double Tap gesture, brighter Always-On Retina display, and advanced health features.",
    price: 41900,
    mrp: 44900,
    stock: 20,
    categorySlug: "smartwatches",
    brand: "Apple",
    specifications: {
      Display: "41mm Always-On Retina LTPO OLED",
      Chip: "S9 SiP",
      "Water Resistance": "WR50 (50m)",
      Battery: "Up to 18 hours",
      Sensors: "Heart rate, SpO2, Temperature, ECG",
      Connectivity: "GPS, Bluetooth 5.3, Wi-Fi",
    },
    images: img.appleWatch,
  },
  {
    name: "Fire-Boltt Phoenix Ultra Luxury Smartwatch",
    description:
      "Fire-Boltt Phoenix Ultra with 1.39 inch AMOLED display, Bluetooth calling, 120+ sports modes, and always-on display.",
    price: 1999,
    mrp: 8999,
    stock: 150,
    categorySlug: "smartwatches",
    brand: "Fire-Boltt",
    specifications: {
      Display: "1.39 inch AMOLED",
      Features: "Bluetooth Calling, SpO2, Heart Rate",
      Battery: "Up to 7 days",
      "Water Resistance": "IP67",
      "Sports Modes": "120+",
    },
    images: img.fireboltt,
  },
  {
    name: "Noise ColorFit Pro 5 Max Smartwatch",
    description:
      "Noise ColorFit Pro 5 Max with 1.96 inch AMOLED display, single-chip Bluetooth calling, and Noise Health Suite.",
    price: 3499,
    mrp: 6999,
    stock: 120,
    categorySlug: "smartwatches",
    brand: "Noise",
    specifications: {
      Display: "1.96 inch AMOLED",
      Features: "Bluetooth Calling, SpO2, Heart Rate",
      Battery: "Up to 7 days",
      "Water Resistance": "IP68",
      "Sports Modes": "100+",
    },
    images: img.noise,
  },

  // ── Men's Clothing ─────────────────────────────────────────────────────────
  {
    name: "Allen Solly Men Regular Fit Checkered Casual Shirt",
    description:
      "Allen Solly regular fit casual shirt in checkered pattern. 100% cotton, comfortable for daily wear and casual outings.",
    price: 1049,
    mrp: 1999,
    stock: 75,
    categorySlug: "mens-clothing",
    brand: "Allen Solly",
    specifications: {
      Fabric: "100% Cotton",
      Fit: "Regular Fit",
      Pattern: "Checkered",
      Sleeve: "Full Sleeve",
      Occasion: "Casual",
    },
    images: img.mensShirt,
  },
  {
    name: "U.S. POLO ASSN. Men Printed Round Neck Cotton T-Shirt",
    description:
      "U.S. Polo Assn. printed round neck t-shirt. Soft cotton fabric with brand logo print. Perfect for casual everyday wear.",
    price: 599,
    mrp: 1299,
    stock: 120,
    categorySlug: "mens-clothing",
    brand: "U.S. POLO ASSN.",
    specifications: {
      Fabric: "100% Cotton",
      Fit: "Regular Fit",
      Pattern: "Printed",
      Sleeve: "Half Sleeve",
      Neck: "Round Neck",
    },
    images: img.mensTshirt,
  },
  {
    name: "Levi's Men 511 Slim Fit Mid-Rise Jeans",
    description:
      "Levi's 511 slim fit jeans with mid-rise waist. Classic indigo wash with slight stretch for all-day comfort.",
    price: 1999,
    mrp: 3999,
    stock: 60,
    categorySlug: "mens-clothing",
    brand: "Levi's",
    specifications: {
      Fabric: "Cotton Blend with Stretch",
      Fit: "Slim Fit",
      Rise: "Mid Rise",
      Wash: "Medium Indigo",
      Closure: "Zip",
    },
    images: img.mensJeans,
  },
  {
    name: "Wildcraft Men Windbreaker Jacket",
    description:
      "Wildcraft windbreaker jacket with water-repellent finish. Lightweight, packable design perfect for travel and outdoor activities.",
    price: 2499,
    mrp: 4999,
    stock: 40,
    categorySlug: "mens-clothing",
    brand: "Wildcraft",
    specifications: {
      Fabric: "Polyester with DWR finish",
      Fit: "Regular Fit",
      Features: "Water-repellent, Packable",
      Closure: "Full Zip",
    },
    images: img.mensJacket,
  },

  // ── Women's Clothing ───────────────────────────────────────────────────────
  {
    name: "BIBA Women Printed A-Line Kurti",
    description:
      "BIBA printed A-line kurti in vibrant ethnic print. Pure cotton fabric with detailed handwork. Perfect for festive and casual wear.",
    price: 899,
    mrp: 1799,
    stock: 90,
    categorySlug: "womens-clothing",
    brand: "BIBA",
    specifications: {
      Fabric: "Pure Cotton",
      Fit: "A-Line",
      Pattern: "Ethnic Print",
      Sleeve: "3/4 Sleeve",
      Occasion: "Casual, Festive",
    },
    images: img.womensKurti,
  },
  {
    name: "Zara Women Floral Print Midi Dress",
    description:
      "Elegant floral print midi dress with cinched waist and flowy silhouette. Lightweight fabric perfect for brunches and day events.",
    price: 2990,
    mrp: 4590,
    stock: 45,
    categorySlug: "womens-clothing",
    brand: "Zara",
    specifications: {
      Fabric: "Viscose Blend",
      Fit: "Regular",
      Pattern: "Floral Print",
      Length: "Midi",
      Occasion: "Casual, Party",
    },
    images: img.womensDress,
  },
  {
    name: "Sabyasachi x Nilaya Banarasi Silk Saree",
    description:
      "Premium Banarasi silk saree with intricate gold zari work. Traditional design with contemporary colors for weddings and celebrations.",
    price: 5999,
    mrp: 8999,
    stock: 20,
    categorySlug: "womens-clothing",
    brand: "Nilaya",
    specifications: {
      Fabric: "Banarasi Silk",
      Work: "Gold Zari",
      Length: "5.5 meters with blouse piece",
      Occasion: "Wedding, Festive",
    },
    images: img.womensSaree,
  },
  {
    name: "Lavie Women's Satchel Handbag",
    description:
      "Lavie structured satchel handbag in premium faux leather. Spacious interior with multiple compartments and detachable sling strap.",
    price: 1799,
    mrp: 3750,
    stock: 55,
    categorySlug: "womens-clothing",
    brand: "Lavie",
    specifications: {
      Material: "Premium Faux Leather",
      Type: "Satchel",
      Compartments: "3 main + 2 inner pockets",
      Closure: "Zip",
    },
    images: img.womensHandbag,
  },

  // ── Footwear ───────────────────────────────────────────────────────────────
  {
    name: "Nike Air Max 270 React Men's Shoes",
    description:
      "Nike Air Max 270 React combines two of Nike's best technologies for an incredibly soft and smooth ride.",
    price: 8995,
    mrp: 13995,
    stock: 30,
    categorySlug: "footwear",
    brand: "Nike",
    specifications: {
      Type: "Running Shoes",
      "Upper Material": "Mesh and Synthetic",
      Sole: "Air Max 270 + React foam",
      Closure: "Lace-Up",
      Gender: "Men",
    },
    images: img.mensSneakers,
  },
  {
    name: "Bata Women Embellished Block Heels",
    description:
      "Bata women's block heels with elegant embellishment. Cushioned footbed for comfort during long hours.",
    price: 1299,
    mrp: 1999,
    stock: 50,
    categorySlug: "footwear",
    brand: "Bata",
    specifications: {
      Type: "Block Heels",
      "Upper Material": "Synthetic",
      "Heel Height": "2.5 inches",
      Closure: "Slip-On",
      Gender: "Women",
    },
    images: img.womensHeels,
  },

  // ── Furniture ──────────────────────────────────────────────────────────────
  {
    name: "Wakefit Napper 3-Seater Sofa (Cobalt Blue)",
    description:
      "Wakefit Napper sofa with high-density foam, solid wood frame, and premium fabric upholstery. 5-year warranty on frame.",
    price: 18999,
    mrp: 32999,
    stock: 10,
    categorySlug: "furniture",
    brand: "Wakefit",
    specifications: {
      Seating: "3 Seater",
      Material: "Solid Wood Frame, HD Foam",
      Upholstery: "Premium Fabric",
      Dimensions: "190 x 80 x 85 cm",
      Warranty: "5 years on frame",
    },
    images: img.sofa,
  },
  {
    name: "Urban Ladder Aurelio Study Table (Teak Finish)",
    description:
      "Urban Ladder Aurelio study table with spacious desktop, cable management, and drawer storage. Solid sheesham wood construction.",
    price: 11999,
    mrp: 18999,
    stock: 15,
    categorySlug: "furniture",
    brand: "Urban Ladder",
    specifications: {
      Material: "Solid Sheesham Wood",
      Finish: "Teak",
      Dimensions: "120 x 60 x 75 cm",
      Drawers: "2",
      Features: "Cable management hole",
    },
    images: img.studyTable,
  },
  {
    name: "Solimo Engineered Wood Bookshelf (Walnut)",
    description:
      "Amazon Brand Solimo bookshelf with 5 open shelves. Engineered wood with walnut finish. Easy DIY assembly.",
    price: 3499,
    mrp: 5999,
    stock: 25,
    categorySlug: "furniture",
    brand: "Solimo",
    specifications: {
      Material: "Engineered Wood",
      Finish: "Walnut",
      Shelves: "5 Open Shelves",
      Dimensions: "60 x 29 x 150 cm",
      Assembly: "DIY (tools included)",
    },
    images: img.bookshelf,
  },
  {
    name: "Royaloak Rover 6-Seater Dining Table Set",
    description:
      "Royaloak Rover 6-seater dining table set with 6 chairs. Solid rubber wood with honey finish. Perfect for family dinners.",
    price: 24999,
    mrp: 39999,
    stock: 8,
    categorySlug: "furniture",
    brand: "Royaloak",
    specifications: {
      Material: "Solid Rubber Wood",
      Finish: "Honey",
      Seating: "6 Seater",
      "Table Dimensions": "150 x 90 x 75 cm",
      Chairs: "6 included",
    },
    images: img.diningTable,
  },

  // ── Home Decor ─────────────────────────────────────────────────────────────
  {
    name: "Bombay Dyeing Bedsheet Set (King Size, 104 TC)",
    description:
      "Bombay Dyeing king-size cotton bedsheet with 2 pillow covers. 104 thread count, vibrant floral print. Colour-fast and easy to wash.",
    price: 699,
    mrp: 1299,
    stock: 80,
    categorySlug: "home-decor",
    brand: "Bombay Dyeing",
    specifications: {
      Size: "King (274 x 274 cm)",
      Material: "100% Cotton",
      "Thread Count": "104 TC",
      Contents: "1 Bedsheet + 2 Pillow Covers",
    },
    images: img.bedsheet,
  },
  {
    name: "Story@Home Polyester Blackout Curtains (Set of 2)",
    description:
      "Room darkening blackout curtains with metal eyelet. Blocks 85% of light. Machine washable polyester fabric.",
    price: 599,
    mrp: 1599,
    stock: 100,
    categorySlug: "home-decor",
    brand: "Story@Home",
    specifications: {
      Size: "4 x 7 feet each",
      Material: "Polyester",
      Type: "Blackout (85% light blocking)",
      Hanging: "Metal Eyelet",
      Contents: "Set of 2",
    },
    images: img.curtain,
  },
  {
    name: "Ajanta Quartz Wall Clock (12 inch, Ivory)",
    description:
      "Ajanta silent sweep wall clock. Step movement for noiseless operation. Clear numerals with contemporary design.",
    price: 399,
    mrp: 649,
    stock: 150,
    categorySlug: "home-decor",
    brand: "Ajanta",
    specifications: {
      Size: "12 inches",
      Movement: "Quartz Silent Sweep",
      Material: "ABS Plastic",
      Battery: "1x AA (not included)",
    },
    images: img.wallClock,
  },

  // ── Kitchen & Dining ───────────────────────────────────────────────────────
  {
    name: "Prestige Iris 750W Mixer Grinder (3 Jars)",
    description:
      "Prestige Iris mixer grinder with 750W motor and 3 stainless steel jars. Suitable for wet and dry grinding.",
    price: 2999,
    mrp: 4795,
    stock: 40,
    categorySlug: "kitchen-dining",
    brand: "Prestige",
    specifications: {
      Power: "750W",
      Jars: "3 Stainless Steel",
      "Speed Settings": "3 + Pulse",
      "Blade Material": "Stainless Steel",
      Warranty: "2 years",
    },
    images: img.mixer,
  },
  {
    name: "Hawkins Futura Hard Anodised Cookware Set (3 Pcs)",
    description:
      "Hawkins Futura 3-piece cookware set with hard anodised finish. Even heating, 4mm thick, PFOA-free. Includes fry pan, saucepan, and kadhai.",
    price: 3299,
    mrp: 4650,
    stock: 30,
    categorySlug: "kitchen-dining",
    brand: "Hawkins",
    specifications: {
      Material: "Hard Anodised Aluminium (4mm thick)",
      Contents: "Fry Pan, Saucepan, Kadhai",
      Coating: "PFOA-free",
      "Heat Source": "Gas and Induction",
    },
    images: img.cookware,
  },
  {
    name: "Milton Thermosteel Flask 1 Litre",
    description:
      "Milton Thermosteel double-wall vacuum insulated flask. Keeps beverages hot for 24 hours and cold for 24 hours.",
    price: 749,
    mrp: 1285,
    stock: 100,
    categorySlug: "kitchen-dining",
    brand: "Milton",
    specifications: {
      Capacity: "1 Litre",
      Material: "Stainless Steel",
      Insulation: "Double-wall Vacuum",
      "Hot/Cold Retention": "24 hours",
    },
    images: img.waterBottle,
  },
  {
    name: "Borosil Prime Lunch Box (3 Containers, 320ml each)",
    description:
      "Borosil borosilicate glass lunch box set with microwave-safe containers and insulated carry bag. Leak-proof lids.",
    price: 999,
    mrp: 1599,
    stock: 70,
    categorySlug: "kitchen-dining",
    brand: "Borosil",
    specifications: {
      Material: "Borosilicate Glass",
      Containers: "3 x 320ml",
      Features: "Microwave-safe, Leak-proof",
      Includes: "Insulated carry bag",
    },
    images: img.lunchBox,
  },

  // ── Televisions ────────────────────────────────────────────────────────────
  {
    name: "Samsung Crystal 4K Neo Series 55 inch UHD Smart TV",
    description:
      "Samsung 55-inch Crystal 4K UHD Smart TV with Dynamic Crystal Color, Crystal Processor 4K, and SmartThings. Tizen OS with built-in apps.",
    price: 44990,
    mrp: 64900,
    stock: 15,
    categorySlug: "televisions",
    brand: "Samsung",
    specifications: {
      "Screen Size": "55 inches",
      Resolution: "4K Ultra HD (3840 x 2160)",
      Panel: "LED",
      "Refresh Rate": "60Hz",
      OS: "Tizen",
      Sound: "20W (2ch)",
      Ports: "3x HDMI, 1x USB",
    },
    images: img.tv,
  },
  {
    name: "LG 43 inch Full HD Smart LED TV (43LM5650PTA)",
    description:
      "LG 43-inch Full HD Smart TV with webOS, Active HDR, and Virtual Surround Plus. Stream Netflix, Prime Video, and more.",
    price: 24990,
    mrp: 34990,
    stock: 20,
    categorySlug: "televisions",
    brand: "LG",
    specifications: {
      "Screen Size": "43 inches",
      Resolution: "Full HD (1920 x 1080)",
      Panel: "LED",
      "Refresh Rate": "60Hz",
      OS: "webOS",
      Sound: "20W",
      Ports: "2x HDMI, 1x USB",
    },
    images: img.tv,
  },
  {
    name: "Redmi Smart TV 32 inch HD Ready",
    description:
      "Redmi 32-inch HD Ready Smart TV with PatchWall, vivid picture engine, and built-in Chromecast. Budget-friendly smart entertainment.",
    price: 10999,
    mrp: 17999,
    stock: 50,
    categorySlug: "televisions",
    brand: "Redmi",
    specifications: {
      "Screen Size": "32 inches",
      Resolution: "HD Ready (1366 x 768)",
      Panel: "LED",
      "Refresh Rate": "60Hz",
      OS: "PatchWall (Android TV)",
      Sound: "20W (2ch)",
    },
    images: img.tv,
  },

  // ── Washing Machines ───────────────────────────────────────────────────────
  {
    name: "Samsung 7kg Fully-Automatic Front Load Washing Machine",
    description:
      "Samsung 7kg front load with EcoBubble technology, Digital Inverter Motor, and Hygiene Steam cycle. 20-year motor warranty.",
    price: 28990,
    mrp: 38990,
    stock: 12,
    categorySlug: "washing-machines",
    brand: "Samsung",
    specifications: {
      Capacity: "7 kg",
      Type: "Fully-Automatic Front Load",
      "Motor Type": "Digital Inverter",
      RPM: "1200",
      Features: "EcoBubble, Hygiene Steam",
      "Energy Rating": "5 Star",
    },
    images: img.washingMachine,
  },
  {
    name: "LG 8kg Semi-Automatic Top Load Washing Machine",
    description:
      "LG 8kg semi-automatic with Roller Jet pulsator, Rat Away technology, and Wind Jet Dry. Budget-friendly and efficient.",
    price: 11490,
    mrp: 14490,
    stock: 20,
    categorySlug: "washing-machines",
    brand: "LG",
    specifications: {
      Capacity: "8 kg",
      Type: "Semi-Automatic Top Load",
      Features: "Roller Jet Pulsator, Rat Away",
      "Spin RPM": "1350",
      "Energy Rating": "4 Star",
    },
    images: img.washingMachine,
  },

  // ── Air Conditioners ───────────────────────────────────────────────────────
  {
    name: "Daikin 1.5 Ton 5 Star Inverter Split AC (Copper)",
    description:
      "Daikin 1.5 Ton 5 Star inverter split AC with copper condenser, PM 2.5 filter, and Coanda Airflow for uniform cooling.",
    price: 42990,
    mrp: 58100,
    stock: 10,
    categorySlug: "air-conditioners",
    brand: "Daikin",
    specifications: {
      Capacity: "1.5 Ton",
      "Energy Rating": "5 Star",
      Type: "Inverter Split",
      "Condenser Coil": "Copper",
      "Cooling Capacity": "5.28 kW",
      Refrigerant: "R-32",
    },
    images: img.ac,
  },
  {
    name: "Voltas 1 Ton 3 Star Split AC (123V DZX)",
    description:
      "Voltas 1 Ton 3 Star split AC with copper condenser, high ambient cooling up to 52°C, and anti-dust filter.",
    price: 27990,
    mrp: 37990,
    stock: 15,
    categorySlug: "air-conditioners",
    brand: "Voltas",
    specifications: {
      Capacity: "1 Ton",
      "Energy Rating": "3 Star",
      Type: "Split",
      "Condenser Coil": "Copper",
      Features: "High ambient cooling (52°C)",
    },
    images: img.ac,
  },

  // ── Refrigerators ──────────────────────────────────────────────────────────
  {
    name: "Samsung 253L Frost Free Double Door Refrigerator",
    description:
      "Samsung 253L double door refrigerator with Digital Inverter Technology, Convertible 5-in-1, and All-Around Cooling.",
    price: 24990,
    mrp: 30990,
    stock: 15,
    categorySlug: "refrigerators",
    brand: "Samsung",
    specifications: {
      Capacity: "253 Litres",
      Type: "Frost Free Double Door",
      "Energy Rating": "3 Star",
      Compressor: "Digital Inverter",
      Features: "Convertible 5-in-1, All-Around Cooling",
    },
    images: img.refrigerator,
  },
  {
    name: "Whirlpool 190L Direct Cool Single Door Refrigerator",
    description:
      "Whirlpool 190L single door refrigerator with Intellisense Inverter Technology and Stabilizer-free operation (130V–300V).",
    price: 13990,
    mrp: 18200,
    stock: 25,
    categorySlug: "refrigerators",
    brand: "Whirlpool",
    specifications: {
      Capacity: "190 Litres",
      Type: "Direct Cool Single Door",
      "Energy Rating": "4 Star",
      Compressor: "Intellisense Inverter",
      Features: "Stabilizer-free (130V-300V)",
    },
    images: img.refrigerator,
  },

  // ── Skincare ───────────────────────────────────────────────────────────────
  {
    name: "Cetaphil Moisturising Cream (250g)",
    description:
      "Cetaphil moisturising cream for dry to very dry, sensitive skin. Clinically proven to provide 48-hour hydration. Non-greasy, fragrance-free.",
    price: 595,
    mrp: 845,
    stock: 100,
    categorySlug: "skincare",
    brand: "Cetaphil",
    specifications: {
      "Skin Type": "Dry to Very Dry, Sensitive",
      Weight: "250g",
      Features: "Fragrance-free, Non-greasy",
      "Hydration Duration": "48 hours",
    },
    images: img.faceCream,
  },
  {
    name: "Neutrogena Ultra Sheer Dry-Touch Sunblock SPF 50+",
    description:
      "Neutrogena ultra-sheer sunscreen with SPF 50+ PA+++. Dry-touch technology leaves no white cast. Lightweight, non-comedogenic formula.",
    price: 499,
    mrp: 749,
    stock: 80,
    categorySlug: "skincare",
    brand: "Neutrogena",
    specifications: {
      SPF: "50+ PA+++",
      Type: "Dry-Touch Sunscreen",
      Weight: "88ml",
      Features: "Non-comedogenic, No white cast",
    },
    images: img.sunscreen,
  },

  // ── Haircare ───────────────────────────────────────────────────────────────
  {
    name: "L'Oréal Paris Extraordinary Oil Shampoo (1L)",
    description:
      "L'Oréal Extraordinary Oil nourishing shampoo for dry and dull hair. Infused with 6 micro-oils for deep nourishment and shine.",
    price: 649,
    mrp: 850,
    stock: 70,
    categorySlug: "haircare",
    brand: "L'Oréal Paris",
    specifications: {
      "Hair Type": "Dry and Dull",
      Volume: "1 Litre",
      "Key Ingredient": "6 Micro-Oils",
      Features: "Deep Nourishment, Shine",
    },
    images: img.shampoo,
  },
  {
    name: "Dyson Supersonic Hair Dryer (Nickel/Copper)",
    description:
      "Dyson Supersonic hair dryer with intelligent heat control to prevent extreme damage. Engineered for different hair types with magnetic attachments.",
    price: 34900,
    mrp: 34900,
    stock: 8,
    categorySlug: "haircare",
    brand: "Dyson",
    specifications: {
      Motor: "Dyson digital motor V9",
      "Heat Settings": "4",
      "Speed Settings": "3",
      Attachments: "5 magnetic",
      Cable: "2.7m",
      Weight: "659g",
    },
    images: img.hairDryer,
  },

  // ── Fragrances ─────────────────────────────────────────────────────────────
  {
    name: "Park Avenue Voyage Amazon Woods EDP (100ml)",
    description:
      "Park Avenue Voyage eau de parfum with woody aromatic notes. Long-lasting fragrance for the modern man. Top notes of bergamot and lavender.",
    price: 599,
    mrp: 799,
    stock: 60,
    categorySlug: "fragrances",
    brand: "Park Avenue",
    specifications: {
      Type: "Eau de Parfum",
      Volume: "100ml",
      "Fragrance Family": "Woody Aromatic",
      "Top Notes": "Bergamot, Lavender",
      Gender: "Men",
    },
    images: img.perfume,
  },
  {
    name: "Skinn by Titan Celeste Perfume for Women (100ml)",
    description:
      "Skinn by Titan Celeste eau de parfum. An enchanting blend of floral and fruity notes. Made in France with premium ingredients.",
    price: 1595,
    mrp: 1995,
    stock: 40,
    categorySlug: "fragrances",
    brand: "Skinn by Titan",
    specifications: {
      Type: "Eau de Parfum",
      Volume: "100ml",
      "Fragrance Family": "Floral Fruity",
      Origin: "Made in France",
      Gender: "Women",
    },
    images: img.perfume,
  },

  // ── Grooming ───────────────────────────────────────────────────────────────
  {
    name: "Philips OneBlade Face + Body Hybrid Trimmer",
    description:
      "Philips OneBlade hybrid trimmer for face and body. Trim, edge, and shave any length of hair. Wet and dry use, 60-min runtime.",
    price: 2499,
    mrp: 3495,
    stock: 50,
    categorySlug: "grooming",
    brand: "Philips",
    specifications: {
      Type: "Hybrid Trimmer (Face + Body)",
      Runtime: "60 minutes",
      "Charging Time": "4 hours",
      Blades: "Dual-sided OneBlade",
      "Water Resistance": "Wet & Dry",
    },
    images: img.trimmer,
  },
  {
    name: "Maybelline New York Sensational Liquid Matte Lipstick",
    description:
      "Maybelline Sensational liquid matte lipstick with 16-hour stay. Lightweight, non-drying formula in a bold red shade.",
    price: 249,
    mrp: 399,
    stock: 200,
    categorySlug: "grooming",
    brand: "Maybelline",
    specifications: {
      Type: "Liquid Matte Lipstick",
      Finish: "Matte",
      Longevity: "16 hours",
      Shade: "Red Siren",
      Features: "Lightweight, Non-drying",
    },
    images: img.lipstick,
  },

  // ── Toys ───────────────────────────────────────────────────────────────────
  {
    name: "LEGO Classic Medium Creative Brick Box (484 Pcs)",
    description:
      "LEGO Classic brick box with 484 pieces in 35 different colours. Includes windows, eyes, and wheels for endless creative building.",
    price: 2499,
    mrp: 3499,
    stock: 40,
    categorySlug: "toys",
    brand: "LEGO",
    specifications: {
      Pieces: "484",
      "Age Group": "4+ years",
      Colors: "35 different colours",
      Includes: "Windows, eyes, wheels, baseplate",
    },
    images: img.lego,
  },
  {
    name: "Funskool Monopoly Board Game",
    description:
      "The classic Monopoly board game by Funskool. Buy, sell, and trade properties to become the wealthiest player. Fun for the whole family.",
    price: 599,
    mrp: 899,
    stock: 60,
    categorySlug: "toys",
    brand: "Funskool",
    specifications: {
      "Age Group": "8+ years",
      Players: "2-8",
      Contents: "Board, tokens, cards, money, dice",
      Type: "Strategy Board Game",
    },
    images: img.boardGame,
  },
  {
    name: "Hot Wheels RC Terrain Twister Remote Control Car",
    description:
      "Hot Wheels RC Terrain Twister with all-terrain capability. 2.4GHz frequency for interference-free play. Performs spins and stunts.",
    price: 3999,
    mrp: 5999,
    stock: 25,
    categorySlug: "toys",
    brand: "Hot Wheels",
    specifications: {
      Type: "Remote Control Car",
      "Age Group": "6+ years",
      Frequency: "2.4 GHz",
      Battery: "Rechargeable (USB)",
      Features: "All-terrain, 360° spins",
    },
    images: img.remoteCar,
  },

  // ── Baby Care ──────────────────────────────────────────────────────────────
  {
    name: "Pampers All Round Protection Pants (L, 64 Count)",
    description:
      "Pampers All Round Protection diaper pants with Lotion with Aloe Vera. 12-hour leak lock, soft cotton-like cover for baby's comfort.",
    price: 1049,
    mrp: 1399,
    stock: 80,
    categorySlug: "baby-care",
    brand: "Pampers",
    specifications: {
      Size: "Large (9-14 kg)",
      Count: "64 Pants",
      Protection: "12-hour leak lock",
      Features: "Lotion with Aloe Vera, Cotton-like softness",
    },
    images: img.diapers,
  },
  {
    name: "Johnson's Baby Gift Set (7 Items)",
    description:
      "Johnson's Baby essential gift set with shampoo, lotion, powder, oil, soap, cream, and wipes. Clinically proven mild and gentle.",
    price: 499,
    mrp: 699,
    stock: 50,
    categorySlug: "baby-care",
    brand: "Johnson's Baby",
    specifications: {
      Contents:
        "Shampoo, Lotion, Powder, Oil, Soap, Cream, Wipes",
      "Suitable For": "Newborn+",
      Features: "Clinically proven mild, No more tears",
    },
    images: img.babyCare,
  },

  // ── Staples ────────────────────────────────────────────────────────────────
  {
    name: "India Gate Basmati Rice - Super (5 kg)",
    description:
      "India Gate Super basmati rice. Aged, long grain rice with aromatic flavour. Perfect for biryani, pulao, and everyday meals.",
    price: 499,
    mrp: 580,
    stock: 200,
    categorySlug: "staples",
    brand: "India Gate",
    specifications: {
      Weight: "5 kg",
      Type: "Basmati Rice",
      Grain: "Long Grain, Aged",
      "Best For": "Biryani, Pulao, Steamed Rice",
    },
    images: img.rice,
  },
  {
    name: "Fortune Sunlite Refined Sunflower Oil (5L)",
    description:
      "Fortune Sunlite refined sunflower oil with Vitamin A & D. Light, healthy cooking oil suitable for all types of cooking.",
    price: 649,
    mrp: 740,
    stock: 150,
    categorySlug: "staples",
    brand: "Fortune",
    specifications: {
      Volume: "5 Litres",
      Type: "Refined Sunflower Oil",
      Enriched: "Vitamin A & D",
    },
    images: img.oil,
  },
  {
    name: "Tata Tea Gold (1 kg)",
    description:
      "Tata Tea Gold – 15% long leaves for a rich, aromatic cup. India's favourite premium tea brand.",
    price: 475,
    mrp: 530,
    stock: 180,
    categorySlug: "staples",
    brand: "Tata Tea",
    specifications: {
      Weight: "1 kg",
      Type: "Loose Leaf Black Tea",
      Features: "15% Long Leaves",
    },
    images: img.tea,
  },

  // ── Snacks & Beverages ─────────────────────────────────────────────────────
  {
    name: "Haldiram's Namkeen Aloo Bhujia (1 kg)",
    description:
      "Haldiram's classic Aloo Bhujia namkeen. Crispy potato noodles with traditional Indian spices. Perfect tea-time snack.",
    price: 210,
    mrp: 255,
    stock: 150,
    categorySlug: "snacks-beverages",
    brand: "Haldiram's",
    specifications: {
      Weight: "1 kg",
      Type: "Namkeen / Savory Snack",
      Flavour: "Traditional Indian Spices",
      "Shelf Life": "6 months",
    },
    images: img.snack,
  },
  {
    name: "Cadbury Dairy Milk Silk Oreo (60g, Pack of 7)",
    description:
      "Cadbury Dairy Milk Silk Oreo – a heavenly combination of smooth Silk chocolate and crunchy Oreo cookie pieces. Irresistible indulgence.",
    price: 560,
    mrp: 630,
    stock: 100,
    categorySlug: "snacks-beverages",
    brand: "Cadbury",
    specifications: {
      Weight: "60g x 7 = 420g",
      Type: "Chocolate Bar",
      Variant: "Silk Oreo",
    },
    images: img.chocolate,
  },
];

// ─── Seed function ──────────────────────────────────────────────────────────
async function main() {
  console.log("🌱 Starting seed...\n");

  // Clean existing data (in dependency order)
  console.log("🧹 Cleaning existing data...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();

  // ── Default user ────────────────────────────────────────────────────────
  console.log("👤 Creating default user...");
  const user = await prisma.user.create({
    data: {
      name: "Flipkart User",
      email: "user@flipkart.com",
      password: "password123",
      phone: "9876543210",
    },
  });
  console.log(`   Created user: ${user.email}`);

  // ── Default address ─────────────────────────────────────────────────────
  await prisma.address.create({
    data: {
      userId: user.id,
      fullName: "Flipkart User",
      phone: "9876543210",
      pincode: "560001",
      state: "Karnataka",
      city: "Bengaluru",
      line1: "Outer Ring Road",
      line2: "Embassy Tech Village, Devarabisanahalli",
      landmark: "Near Marathahalli Bridge",
      isDefault: true,
      type: "WORK",
    },
  });

  // ── Categories ──────────────────────────────────────────────────────────
  console.log("📁 Creating categories...");
  const categoryMap = new Map<string, string>(); // slug → id

  for (const cat of categories) {
    const parent = await prisma.category.create({
      data: { name: cat.name, slug: cat.slug },
    });
    categoryMap.set(cat.slug, parent.id);

    for (const child of cat.children) {
      const sub = await prisma.category.create({
        data: { name: child.name, slug: child.slug, parentId: parent.id },
      });
      categoryMap.set(child.slug, sub.id);
    }
  }
  console.log(`   Created ${categoryMap.size} categories`);

  // ── Products ────────────────────────────────────────────────────────────
  console.log("📦 Creating products...");
  let productCount = 0;

  for (const p of products) {
    const categoryId = categoryMap.get(p.categorySlug);
    if (!categoryId) {
      console.warn(`   ⚠️  Category "${p.categorySlug}" not found, skipping: ${p.name}`);
      continue;
    }

    await prisma.product.create({
      data: {
        name: p.name,
        description: p.description,
        price: p.price,
        mrp: p.mrp,
        stock: p.stock,
        categoryId,
        brand: p.brand,
        specifications: p.specifications,
        images: {
          create: p.images.map((url, idx) => ({
            imageUrl: url,
            isPrimary: idx === 0,
            sortOrder: idx,
          })),
        },
      },
    });
    productCount++;
  }
  console.log(`   Created ${productCount} products`);

  // ── Cart with sample items ──────────────────────────────────────────────
  console.log("🛒 Creating sample cart...");
  const sampleProducts = await prisma.product.findMany({ take: 3 });
  if (sampleProducts.length > 0) {
    await prisma.cart.create({
      data: {
        userId: user.id,
        items: {
          create: sampleProducts.map((p) => ({
            productId: p.id,
            quantity: 1,
          })),
        },
      },
    });
    console.log(`   Added ${sampleProducts.length} items to cart`);
  }

  console.log("\n✅ Seed completed successfully!");
  console.log(
    `   Summary: 1 user, ${categoryMap.size} categories, ${productCount} products\n`
  );
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
