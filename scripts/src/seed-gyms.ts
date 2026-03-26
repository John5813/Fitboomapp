import { db } from "@workspace/db";
import { gymsTable } from "@workspace/db/schema";

const gyms = [
  {
    name: "FitZone Premium",
    description: "Toshkentdagi eng zamonaviy fitness markazi. Barcha sport turlari uchun professional jihozlar.",
    address: "Mirzo Ulug'bek tumani, Amir Temur ko'chasi, 108",
    latitude: 41.2995,
    longitude: 69.2401,
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=80",
    ],
    credits: 1,
    categories: ["fitness", "crossfit", "yoga"],
    amenities: ["Dush", "Sauna", "Locker", "Parking", "WiFi"],
    operatingHours: {
      mon: { open: "06:00", close: "22:00" },
      tue: { open: "06:00", close: "22:00" },
      wed: { open: "06:00", close: "22:00" },
      thu: { open: "06:00", close: "22:00" },
      fri: { open: "06:00", close: "22:00" },
      sat: { open: "07:00", close: "21:00" },
      sun: { open: "08:00", close: "20:00" },
    },
    rating: 4.8,
    reviewCount: 234,
  },
  {
    name: "Hercules Sport Club",
    description: "Kuch va boks bo'yicha ixtisoslashgan sport klubi. Professional murabbiylar jamoasi.",
    address: "Yunusobod tumani, Yunusobod ko'chasi, 15",
    latitude: 41.3390,
    longitude: 69.2799,
    imageUrl: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80",
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
    ],
    credits: 1,
    categories: ["fitness", "boxing", "crossfit"],
    amenities: ["Dush", "Locker", "Parking"],
    operatingHours: {
      mon: { open: "07:00", close: "22:00" },
      tue: { open: "07:00", close: "22:00" },
      wed: { open: "07:00", close: "22:00" },
      thu: { open: "07:00", close: "22:00" },
      fri: { open: "07:00", close: "22:00" },
      sat: { open: "08:00", close: "20:00" },
      sun: { open: "09:00", close: "18:00" },
    },
    rating: 4.6,
    reviewCount: 187,
  },
  {
    name: "Aqua Life Pool & Fitness",
    description: "50 metrlik professional basseyn va zamonaviy fitness zali. Suv sporti va suzish darslari.",
    address: "Chilonzor tumani, Bunyodkor ko'chasi, 22",
    latitude: 41.2837,
    longitude: 69.2072,
    imageUrl: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80",
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
    ],
    credits: 1,
    categories: ["swimming", "fitness", "yoga"],
    amenities: ["Basseyn", "Dush", "Sauna", "Locker", "Parking", "Kafeteriya"],
    operatingHours: {
      mon: { open: "06:00", close: "22:00" },
      tue: { open: "06:00", close: "22:00" },
      wed: { open: "06:00", close: "22:00" },
      thu: { open: "06:00", close: "22:00" },
      fri: { open: "06:00", close: "22:00" },
      sat: { open: "07:00", close: "21:00" },
      sun: { open: "08:00", close: "20:00" },
    },
    rating: 4.9,
    reviewCount: 312,
  },
  {
    name: "Zen Yoga Studio",
    description: "Toshkentning yetakchi yoga studiyasi. Barcha darajalar uchun darslar: hatha, vinyasa, yin yoga.",
    address: "Shayxontohur tumani, Navoiy ko'chasi, 45",
    latitude: 41.3097,
    longitude: 69.2584,
    imageUrl: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    ],
    credits: 1,
    categories: ["yoga", "fitness"],
    amenities: ["Dush", "Locker", "WiFi", "Chang'alcha"],
    operatingHours: {
      mon: { open: "07:00", close: "21:00" },
      tue: { open: "07:00", close: "21:00" },
      wed: { open: "07:00", close: "21:00" },
      thu: { open: "07:00", close: "21:00" },
      fri: { open: "07:00", close: "21:00" },
      sat: { open: "08:00", close: "20:00" },
      sun: { open: "09:00", close: "18:00" },
    },
    rating: 4.7,
    reviewCount: 156,
  },
  {
    name: "CrossFit Tashkent",
    description: "Professional CrossFit box. Kuchli jamoa, intensiv treninglar va do'stona muhit.",
    address: "Yashnobod tumani, Yashnobod ko'chasi, 78",
    latitude: 41.2690,
    longitude: 69.3148,
    imageUrl: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&q=80",
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80",
    ],
    credits: 1,
    categories: ["crossfit", "fitness"],
    amenities: ["Dush", "Locker", "Parking"],
    operatingHours: {
      mon: { open: "06:00", close: "21:00" },
      tue: { open: "06:00", close: "21:00" },
      wed: { open: "06:00", close: "21:00" },
      thu: { open: "06:00", close: "21:00" },
      fri: { open: "06:00", close: "21:00" },
      sat: { open: "07:00", close: "19:00" },
      sun: { open: "08:00", close: "17:00" },
    },
    rating: 4.5,
    reviewCount: 98,
  },
  {
    name: "Sport Palace Basketball",
    description: "To'liq o'lchamli basketbol maydoni va katta sport zali. Guruh mashg'ulotlari va individual trening.",
    address: "Uchtepa tumani, Mustaqillik ko'chasi, 12",
    latitude: 41.2612,
    longitude: 69.2234,
    imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
      "https://images.unsplash.com/photo-1505666287802-931dc83948e9?w=800&q=80",
    ],
    credits: 1,
    categories: ["basketball", "fitness"],
    amenities: ["Dush", "Locker", "Parking", "Trибuna"],
    operatingHours: {
      mon: { open: "08:00", close: "22:00" },
      tue: { open: "08:00", close: "22:00" },
      wed: { open: "08:00", close: "22:00" },
      thu: { open: "08:00", close: "22:00" },
      fri: { open: "08:00", close: "22:00" },
      sat: { open: "09:00", close: "21:00" },
      sun: { open: "09:00", close: "18:00" },
    },
    rating: 4.4,
    reviewCount: 76,
  },
  {
    name: "Elite Tennis Club",
    description: "Toshkentdagi yagona yopiq tennis korttlari kompleksi. Professional murabbiylar, har darajadagi o'yinchilar uchun.",
    address: "Mirzo Ulug'bek tumani, Bog'ishamol ko'chasi, 5",
    latitude: 41.3201,
    longitude: 69.2456,
    imageUrl: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80",
      "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=800&q=80",
    ],
    credits: 1,
    categories: ["tennis", "fitness"],
    amenities: ["Dush", "Locker", "Parking", "Kafeteriya", "WiFi"],
    operatingHours: {
      mon: { open: "07:00", close: "22:00" },
      tue: { open: "07:00", close: "22:00" },
      wed: { open: "07:00", close: "22:00" },
      thu: { open: "07:00", close: "22:00" },
      fri: { open: "07:00", close: "22:00" },
      sat: { open: "08:00", close: "21:00" },
      sun: { open: "09:00", close: "19:00" },
    },
    rating: 4.7,
    reviewCount: 143,
  },
  {
    name: "Power Gym",
    description: "Og'ir atletika va kuch sporti bo'yicha ixtisoslashgan zal. Professional og'irliklarni ko'tarish uchun yetuklik.",
    address: "Sergeli tumani, Kattabog' ko'chasi, 34",
    latitude: 41.2204,
    longitude: 69.2489,
    imageUrl: "https://images.unsplash.com/photo-1517963879433-6ad2171073fb?w=800&q=80",
    imageUrls: [
      "https://images.unsplash.com/photo-1517963879433-6ad2171073fb?w=800&q=80",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    ],
    credits: 1,
    categories: ["fitness", "crossfit"],
    amenities: ["Dush", "Locker", "Parking"],
    operatingHours: {
      mon: { open: "06:00", close: "23:00" },
      tue: { open: "06:00", close: "23:00" },
      wed: { open: "06:00", close: "23:00" },
      thu: { open: "06:00", close: "23:00" },
      fri: { open: "06:00", close: "23:00" },
      sat: { open: "07:00", close: "22:00" },
      sun: { open: "08:00", close: "20:00" },
    },
    rating: 4.3,
    reviewCount: 89,
  },
];

async function seed() {
  console.log("🌱 Seed ma'lumotlar kiritilmoqda...");

  const existing = await db.select().from(gymsTable);
  if (existing.length > 0) {
    console.log(`✓ ${existing.length} ta zal allaqachon mavjud. Seed o'tkazib yuborildi.`);
    process.exit(0);
  }

  for (const gym of gyms) {
    await db.insert(gymsTable).values(gym);
    console.log(`  ✓ ${gym.name}`);
  }

  console.log(`\n✅ ${gyms.length} ta zal qo'shildi!`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed xatolik:", err);
  process.exit(1);
});
