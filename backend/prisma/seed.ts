import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import * as bcrypt from "bcrypt";

let connectionUrl =
  process.env.DATABASE_URL ||
  "mysql://root:rootpassword@mysql:3306/scm_db?allowPublicKeyRetrieval=true";

if (
  (connectionUrl.startsWith("mysql://") || connectionUrl.startsWith("mariadb://")) &&
  !connectionUrl.includes("allowPublicKeyRetrieval=")
) {
  connectionUrl += (connectionUrl.includes("?") ? "&" : "?") + "allowPublicKeyRetrieval=true";
}

const adapter = new PrismaMariaDb(connectionUrl);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Memulai Seeding Data SCM BAPER...");

  const saltRounds = 10;
  const hashAdmin = await bcrypt.hash("Admin#2025", saltRounds);
  const hashOwner = await bcrypt.hash("RahasiaSuper2025!", saltRounds);
  const hashGudang = await bcrypt.hash("Gudang#2025", saltRounds);
  const hashKasir = await bcrypt.hash("Kasir#2025", saltRounds);
  const hashPemasok = await bcrypt.hash("Pemasok#2025", saltRounds);

  // 1. Bersihkan data lama jika ada
  await prisma.branchTransferItem.deleteMany();
  await prisma.branchTransfer.deleteMany();
  await prisma.kitchenBatchItem.deleteMany();
  await prisma.kitchenBatch.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.productIngredient.deleteMany();
  await prisma.product.deleteMany();
  await prisma.stockMovement.deleteMany();
  await prisma.purchaseOrderItem.deleteMany();
  await prisma.purchaseOrder.deleteMany();
  await prisma.ingredient.deleteMany();
  await prisma.supplierItem.deleteMany();
  await prisma.businessSupplier.deleteMany();
  await prisma.supplier.deleteMany();
  await prisma.businessMember.deleteMany();
  await prisma.branch.deleteMany();
  await prisma.business.deleteMany();
  await prisma.authToken.deleteMany();
  await prisma.user.deleteMany();

  console.log("🧹 Data lama berhasil dibersihkan.");

  // 2. Buat Pengguna Utama
  const superAdmin = await prisma.user.create({
    data: {
      email: "admin@baper.id",
      name: "Super Admin BAPER",
      passwordHash: hashAdmin,
      role: "super_admin",
      isActive: true,
    },
  });

  const owner = await prisma.user.create({
    data: {
      email: "owner@baperfnb.com",
      name: "Budi Santoso",
      passwordHash: hashOwner,
      role: "owner",
      isActive: true,
    },
  });

  const gudangUser = await prisma.user.create({
    data: {
      email: "gudang@baperfnb.com",
      name: "Bambang Prakoso",
      passwordHash: hashGudang,
      role: "manajer_gudang",
      isActive: true,
    },
  });

  const kasirUser = await prisma.user.create({
    data: {
      email: "kasir@baperfnb.com",
      name: "Budi Hartono",
      passwordHash: hashKasir,
      role: "kasir",
      isActive: true,
    },
  });

  const pemasokUser = await prisma.user.create({
    data: {
      email: "pemasok@baper.id",
      name: "Hendra Wijaya",
      passwordHash: hashPemasok,
      role: "pemasok",
      isActive: true,
    },
  });

  console.log("👤 5 Pengguna berhasil dibuat.");

  // 3. Buat Profil Pemasok (Vendor)
  const supplier = await prisma.supplier.create({
    data: {
      userId: pemasokUser.id,
      name: "PT Tani Makmur Sejahtera",
      category: "raw_supplier",
      phone: "081198765432",
      address: "Kawasan Industri Sentul Blok B3, Bogor",
      isActive: true,
    },
  });

  // Katalog Bahan dari Pemasok (Supplier Items)
  const supKopi = await prisma.supplierItem.create({
    data: {
      supplierId: supplier.id,
      name: "Biji Kopi Arabika Lintong (25 kg)",
      unit: "kg",
      price: 125000,
      stockQty: 500,
      isAvailable: true,
    },
  });

  const supSusu = await prisma.supplierItem.create({
    data: {
      supplierId: supplier.id,
      name: "Fresh Milk Pasteurisasi (1 L)",
      unit: "liter",
      price: 18000,
      stockQty: 1000,
      isAvailable: true,
    },
  });

  const supAren = await prisma.supplierItem.create({
    data: {
      supplierId: supplier.id,
      name: "Gula Aren Organik Cair (5 L)",
      unit: "liter",
      price: 85000,
      stockQty: 300,
      isAvailable: true,
    },
  });

  const supCup = await prisma.supplierItem.create({
    data: {
      supplierId: supplier.id,
      name: "Paper Cup Hot/Cold 12oz (50 pcs)",
      unit: "pcs",
      price: 35000,
      stockQty: 2500,
      isAvailable: true,
    },
  });

  const supSirup = await prisma.supplierItem.create({
    data: {
      supplierId: supplier.id,
      name: "Sirup Karamel Premium (750 ml)",
      unit: "ml",
      price: 95000,
      stockQty: 150,
      isAvailable: true,
    },
  });

  console.log("🏭 Profil Pemasok & Katalog Bahan berhasil dibuat.");

  // 4. Buat Bisnis / Outlet F&B
  const business = await prisma.business.create({
    data: {
      userId: owner.id,
      name: "Kopi Kenangan Senopati #04",
      category: "coffee",
      address: "Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan",
      phoneBusiness: "081234567890",
      description: "Kedai Kopi Signature dengan sistem manajemen rantai pasok cerdas.",
    },
  });

  // 4b. Buat Daftar Cabang (Branches) untuk Bisnis F&B
  const branchSenopati = await prisma.branch.create({
    data: {
      businessId: business.id,
      name: "Kopi Kenangan Senopati #04",
      code: "Cabang Utama #04",
      address: "Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan",
      phone: "081234567890",
      isMain: true,
      isActive: true,
    },
  });

  await prisma.branch.createMany({
    data: [
      {
        businessId: business.id,
        name: "Kopi Kenangan SCBD #07",
        code: "Cabang #07",
        address: "SCBD Lot 8, Jl. Jend. Sudirman, Jakarta Selatan",
        phone: "081234567891",
        isMain: false,
        isActive: true,
      },
      {
        businessId: business.id,
        name: "Kopi Kenangan Kemang #11",
        code: "Cabang #11",
        address: "Jl. Kemang Raya No. 18, Mampang Prapatan, Jakarta Selatan",
        phone: "081234567892",
        isMain: false,
        isActive: true,
      },
    ],
  });

  // Tautkan staf ke bisnis & cabang penugasan
  await prisma.businessMember.createMany({
    data: [
      {
        businessId: business.id,
        branchId: branchSenopati.id,
        userId: gudangUser.id,
        role: "manajer_gudang",
        isActive: true,
      },
      {
        businessId: business.id,
        branchId: branchSenopati.id,
        userId: kasirUser.id,
        role: "kasir",
        isActive: true,
      },
    ],
  });

  // Tautkan Pemasok ke Bisnis
  await prisma.businessSupplier.create({
    data: {
      businessId: business.id,
      supplierId: supplier.id,
      status: "active",
    },
  });

  console.log("☕ Bisnis F&B & Staf berhasil dibuat.");

  // 5. Buat Bahan Baku Gudang (Ingredients)
  const ingKopi = await prisma.ingredient.create({
    data: {
      businessId: business.id,
      preferredSupplierId: supplier.id,
      name: "Biji Kopi Arabika Lintong",
      unit: "gram",
      stock: 25000, // 25 kg
      minStock: 5000,
      category: "coffee",
      locationRack: "RAK-A1-02",
      expiryDate: new Date(Date.now() + 180 * 864e5),
    },
  });

  const ingSusu = await prisma.ingredient.create({
    data: {
      businessId: business.id,
      preferredSupplierId: supplier.id,
      name: "Fresh Milk Pasteurisasi",
      unit: "ml",
      stock: 60000, // 60 Liter
      minStock: 20000,
      category: "dairy",
      locationRack: "CHILLER-B2",
      expiryDate: new Date(Date.now() + 14 * 864e5),
    },
  });

  const ingAren = await prisma.ingredient.create({
    data: {
      businessId: business.id,
      preferredSupplierId: supplier.id,
      name: "Gula Aren Cair Organik",
      unit: "ml",
      stock: 15000, // 15 Liter
      minStock: 5000,
      category: "flavor",
      locationRack: "RAK-C3-01",
      expiryDate: new Date(Date.now() + 90 * 864e5),
    },
  });

  const ingSirup = await prisma.ingredient.create({
    data: {
      businessId: business.id,
      preferredSupplierId: supplier.id,
      name: "Sirup Karamel Premium",
      unit: "ml",
      stock: 1800, // Kritis (< minStock)
      minStock: 3000,
      category: "flavor",
      locationRack: "RAK-C3-02",
      expiryDate: new Date(Date.now() + 120 * 864e5),
    },
  });

  const ingCup = await prisma.ingredient.create({
    data: {
      businessId: business.id,
      preferredSupplierId: supplier.id,
      name: "Paper Cup 12oz BAPER",
      unit: "pcs",
      stock: 850,
      minStock: 200,
      category: "packaging",
      locationRack: "RAK-D1-04",
      expiryDate: new Date(Date.now() + 365 * 864e5),
    },
  });

  const ingRoti = await prisma.ingredient.create({
    data: {
      businessId: business.id,
      preferredSupplierId: supplier.id,
      name: "Roti Brioche Tawar",
      unit: "pcs",
      stock: 120,
      minStock: 30,
      category: "bakery",
      locationRack: "RAK-E1-01",
      expiryDate: new Date(Date.now() + 5 * 864e5),
    },
  });

  const ingCokelat = await prisma.ingredient.create({
    data: {
      businessId: business.id,
      preferredSupplierId: supplier.id,
      name: "Pasta Cokelat Crunchy",
      unit: "gram",
      stock: 5000,
      minStock: 1000,
      category: "flavor",
      locationRack: "RAK-C3-03",
      expiryDate: new Date(Date.now() + 90 * 864e5),
    },
  });

  console.log("📦 7 Bahan Baku Gudang berhasil dibuat.");

  // 6. Buat Produk Menu & Resep / BOM (Bill of Materials)
  const prodMantan = await prisma.product.create({
    data: {
      businessId: business.id,
      name: "Kopi Kenangan Mantan (Aren Latte)",
      description: "Perpaduan espresso arabika berkualitas, susu segar pilihan, dan gula aren asli Indonesia.",
      price: 22000,
      category: "minuman",
      isAvailable: true,
    },
  });

  const prodAvocado = await prisma.product.create({
    data: {
      businessId: business.id,
      name: "Avocado Coffee Float",
      description: "Jus alpukat premium dipadukan dengan espresso shot dan es krim vanila lembut.",
      price: 32000,
      category: "minuman",
      isAvailable: true,
    },
  });

  const prodCaramel = await prisma.product.create({
    data: {
      businessId: business.id,
      name: "Caramel Macchiato",
      description: "Espresso hangat berlapis susu creamy dengan sirup karamel kental.",
      price: 28000,
      category: "minuman",
      isAvailable: true,
    },
  });

  const prodToast = await prisma.product.create({
    data: {
      businessId: business.id,
      name: "Roti Toast Cokelat Crunchy",
      description: "Roti panggang mentega dengan isian pasta cokelat renyah melimpah.",
      price: 18000,
      category: "snack",
      isAvailable: true,
    },
  });

  const prodPaket = await prisma.product.create({
    data: {
      businessId: business.id,
      name: "Paket Hemat: Aren Latte + Toast",
      description: "Paket kombo nongkrong hemat: 1 Cup Aren Latte + 1 Toast Cokelat.",
      price: 35000,
      category: "paket",
      isAvailable: true,
    },
  });

  // Hubungkan Resep (BOM)
  // Kopi Mantan butuh: 18g Kopi, 150ml Susu, 25ml Aren, 1 Cup
  await prisma.productIngredient.createMany({
    data: [
      { productId: prodMantan.id, ingredientId: ingKopi.id, qtyPerUnit: 18 },
      { productId: prodMantan.id, ingredientId: ingSusu.id, qtyPerUnit: 150 },
      { productId: prodMantan.id, ingredientId: ingAren.id, qtyPerUnit: 25 },
      { productId: prodMantan.id, ingredientId: ingCup.id, qtyPerUnit: 1 },
      // Avocado Float
      { productId: prodAvocado.id, ingredientId: ingKopi.id, qtyPerUnit: 18 },
      { productId: prodAvocado.id, ingredientId: ingSusu.id, qtyPerUnit: 100 },
      { productId: prodAvocado.id, ingredientId: ingCup.id, qtyPerUnit: 1 },
      // Caramel Macchiato
      { productId: prodCaramel.id, ingredientId: ingKopi.id, qtyPerUnit: 18 },
      { productId: prodCaramel.id, ingredientId: ingSusu.id, qtyPerUnit: 150 },
      { productId: prodCaramel.id, ingredientId: ingSirup.id, qtyPerUnit: 20 },
      { productId: prodCaramel.id, ingredientId: ingCup.id, qtyPerUnit: 1 },
      // Roti Toast Cokelat Crunchy
      { productId: prodToast.id, ingredientId: ingRoti.id, qtyPerUnit: 1 },
      { productId: prodToast.id, ingredientId: ingCokelat.id, qtyPerUnit: 30 },
      // Paket Hemat
      { productId: prodPaket.id, ingredientId: ingKopi.id, qtyPerUnit: 18 },
      { productId: prodPaket.id, ingredientId: ingSusu.id, qtyPerUnit: 150 },
      { productId: prodPaket.id, ingredientId: ingAren.id, qtyPerUnit: 25 },
      { productId: prodPaket.id, ingredientId: ingCup.id, qtyPerUnit: 1 },
      { productId: prodPaket.id, ingredientId: ingRoti.id, qtyPerUnit: 1 },
      { productId: prodPaket.id, ingredientId: ingCokelat.id, qtyPerUnit: 30 },
    ],
  });

  console.log("🍔 5 Produk Menu & Relasi Resep (BOM) berhasil dibuat.");

  // 7. Buat Purchase Orders (PO) Pengadaan
  const po1 = await prisma.purchaseOrder.create({
    data: {
      businessId: business.id,
      supplierId: supplier.id,
      createdById: gudangUser.id,
      status: "confirmed",
      totalAmount: 12850000,
      deliveryNote: "SJ-TMS-2024-881",
      driverInfo: "Pak Joko (B 9182 SCM)",
      qcStatus: "pending",
      createdAt: new Date(Date.now() - 3600 * 1000 * 2),
      purchaseOrderItems: {
        create: [
          { supplierItemId: supKopi.id, ingredientId: ingKopi.id, quantity: 50, price: 125000 },
          { supplierItemId: supSusu.id, ingredientId: ingSusu.id, quantity: 120, price: 18000 },
          { supplierItemId: supAren.id, ingredientId: ingAren.id, quantity: 40, price: 85000 },
          { supplierItemId: supCup.id, ingredientId: ingCup.id, quantity: 20, price: 35000 },
        ],
      },
    },
  });

  const po2 = await prisma.purchaseOrder.create({
    data: {
      businessId: business.id,
      supplierId: supplier.id,
      createdById: owner.id,
      status: "received",
      totalAmount: 9750000,
      deliveryNote: "SJ-TMS-2024-820",
      driverInfo: "Pak Asep (B 1203 JKT)",
      qcStatus: "passed",
      qcNotes: "Inspeksi QC Lengkap: Suhu susu 4°C, kemasan vacuum kopi tersegel baik, lolos uji.",
      receivedAt: new Date(Date.now() - 3600 * 1000 * 24),
      createdAt: new Date(Date.now() - 3600 * 1000 * 48),
      purchaseOrderItems: {
        create: [
          { supplierItemId: supKopi.id, ingredientId: ingKopi.id, quantity: 40, price: 125000 },
          { supplierItemId: supSusu.id, ingredientId: ingSusu.id, quantity: 80, price: 18000 },
        ],
      },
    },
  });

  const po3 = await prisma.purchaseOrder.create({
    data: {
      businessId: business.id,
      supplierId: supplier.id,
      createdById: gudangUser.id,
      status: "shipped",
      totalAmount: 4250000,
      deliveryNote: "SJ-TMS-2024-904",
      driverInfo: "Pak Budi (B 7721 SCM - Chilled Van)",
      qcStatus: "pending",
      createdAt: new Date(Date.now() - 3600 * 1000 * 5),
      purchaseOrderItems: {
        create: [
          { supplierItemId: supSusu.id, ingredientId: ingSusu.id, quantity: 100, price: 18000 },
          { supplierItemId: supSirup.id, ingredientId: ingSirup.id, quantity: 15, price: 95000 },
          { supplierItemId: supCup.id, ingredientId: ingCup.id, quantity: 20, price: 35000 },
        ],
      },
    },
  });

  const po4 = await prisma.purchaseOrder.create({
    data: {
      businessId: business.id,
      supplierId: supplier.id,
      createdById: owner.id,
      status: "sent",
      totalAmount: 3400000,
      qcStatus: "pending",
      createdAt: new Date(Date.now() - 3600 * 1000 * 1),
      purchaseOrderItems: {
        create: [
          { supplierItemId: supAren.id, ingredientId: ingAren.id, quantity: 40, price: 85000 },
        ],
      },
    },
  });

  console.log("🚚 4 Purchase Orders (PO) berhasil dibuat.");

  // 8. Buat Transaksi Penjualan Awal (Kasir)
  const order1 = await prisma.order.create({
    data: {
      businessId: business.id,
      createdById: kasirUser.id,
      source: "kasir",
      orderType: "dine-in",
      totalAmount: 44000,
      taxAmount: 4000,
      discountAmount: 0,
      paymentMethod: "cash",
      paidAmount: 50000,
      changeAmount: 6000,
      status: "paid",
      createdAt: new Date(Date.now() - 3600 * 1000 * 4),
      orderItems: {
        create: [
          { productId: prodMantan.id, quantity: 2, price: 22000 },
        ],
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      businessId: business.id,
      createdById: kasirUser.id,
      source: "kasir",
      orderType: "takeaway",
      totalAmount: 50000,
      taxAmount: 0,
      discountAmount: 0,
      paymentMethod: "qris",
      paidAmount: 50000,
      changeAmount: 0,
      status: "paid",
      createdAt: new Date(Date.now() - 3600 * 1000 * 3),
      orderItems: {
        create: [
          { productId: prodAvocado.id, quantity: 1, price: 32000 },
          { productId: prodToast.id, quantity: 1, price: 18000 },
        ],
      },
    },
  });

  const order3 = await prisma.order.create({
    data: {
      businessId: business.id,
      createdById: kasirUser.id,
      source: "web",
      orderType: "takeaway",
      totalAmount: 120000,
      taxAmount: 0,
      discountAmount: 0,
      paymentMethod: "qris",
      paidAmount: 120000,
      changeAmount: 0,
      status: "paid",
      createdAt: new Date(Date.now() - 3600 * 1000 * 2),
      orderItems: {
        create: [
          { productId: prodCaramel.id, quantity: 3, price: 28000 },
          { productId: prodToast.id, quantity: 2, price: 18000 },
        ],
      },
    },
  });

  const order4 = await prisma.order.create({
    data: {
      businessId: business.id,
      createdById: kasirUser.id,
      source: "kasir",
      orderType: "dine-in",
      totalAmount: 70000,
      taxAmount: 0,
      discountAmount: 0,
      paymentMethod: "cash",
      paidAmount: 100000,
      changeAmount: 30000,
      status: "paid",
      createdAt: new Date(Date.now() - 3600 * 1000),
      orderItems: {
        create: [
          { productId: prodPaket.id, quantity: 2, price: 35000 },
        ],
      },
    },
  });

  const order5 = await prisma.order.create({
    data: {
      businessId: business.id,
      createdById: kasirUser.id,
      source: "kasir",
      orderType: "takeaway",
      totalAmount: 88000,
      taxAmount: 0,
      discountAmount: 0,
      paymentMethod: "qris",
      paidAmount: 88000,
      changeAmount: 0,
      status: "paid",
      createdAt: new Date(Date.now() - 1800 * 1000),
      orderItems: {
        create: [
          { productId: prodMantan.id, quantity: 4, price: 22000 },
        ],
      },
    },
  });

  console.log("💰 Transaksi Kasir awal berhasil dibuat.");

  // Catat pemotongan bahan baku otomatis untuk transaksi awal
  const seededOrders = [order1, order2, order3, order4, order5];
  for (const ord of seededOrders) {
    const fullOrder = await prisma.order.findUnique({
      where: { id: ord.id },
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                productIngredients: { include: { ingredient: true } },
              },
            },
          },
        },
      },
    });

    if (fullOrder) {
      for (const item of fullOrder.orderItems) {
        for (const recipe of item.product.productIngredients) {
          const usage = Number(recipe.qtyPerUnit) * item.quantity;
          if (usage > 0) {
            await prisma.ingredient.update({
              where: { id: recipe.ingredientId },
              data: { stock: { decrement: usage } },
            });
            await prisma.stockMovement.create({
              data: {
                ingredientId: recipe.ingredientId,
                createdById: ord.createdById,
                type: "out",
                qty: usage,
                referenceId: `ORDER: ${ord.id.slice(0, 8)} (${item.quantity}x ${item.product.name})`,
                createdAt: ord.createdAt,
              },
            });
          }
        }
      }
    }
  }

  // Setel status pesanan kitchen: sebagian sudah keluar/selesai, sebagian sedang diracik/siap
  await prisma.order.update({ where: { id: order1.id }, data: { status: "completed" } });
  await prisma.order.update({ where: { id: order2.id }, data: { status: "completed" } });
  await prisma.order.update({ where: { id: order3.id }, data: { status: "preparing" } });

  // 12. Batch Produksi Kitchen (terhubung ke Produk Menu Kasir)
  await prisma.kitchenBatch.create({
    data: {
      businessId: business.id,
      productId: prodMantan.id,
      createdById: gudangUser.id,
      batchNumber: "BATCH-20261119-01",
      recipeName: "Produksi Kopi Kenangan Mantan (Aren Latte)",
      station: "Central Bar Extraction",
      operator: "Fahmi Nugraha (Barista Lead)",
      targetQty: 60,
      plannedYield: "60 Porsi Aren Latte",
      actualYield: "58 Porsi",
      progress: 75,
      status: "in_progress",
      notes: "Persiapan base espresso & aren latte untuk shift kasir utama",
      items: {
        create: [
          { name: "Biji Kopi Arabika Lintong", quantity: 1080, unit: "gram", ingredientId: ingKopi.id },
          { name: "Fresh Milk Pasteurisasi", quantity: 9000, unit: "ml", ingredientId: ingSusu.id },
          { name: "Gula Aren Cair Organik", quantity: 1500, unit: "ml", ingredientId: ingAren.id },
          { name: "Paper Cup 12oz BAPER", quantity: 60, unit: "pcs", ingredientId: ingCup.id },
        ],
      },
    },
  });

  await prisma.kitchenBatch.create({
    data: {
      businessId: business.id,
      productId: prodToast.id,
      createdById: owner.id,
      batchNumber: "BATCH-20261119-02",
      recipeName: "Produksi Roti Toast Cokelat Crunchy",
      station: "Bakery Oven Station",
      operator: "Dewi Lestari (Kitchen Staff)",
      targetQty: 30,
      plannedYield: "30 Porsi Roti Toast",
      actualYield: "30 Porsi Roti Toast",
      progress: 100,
      status: "completed",
      notes: "Lolos QC Tekstur & Kematangan Panggang",
      completedAt: new Date(Date.now() - 7200 * 1000),
      items: {
        create: [
          { name: "Roti Brioche Tawar", quantity: 30, unit: "pcs", ingredientId: ingRoti.id },
          { name: "Pasta Cokelat Crunchy", quantity: 900, unit: "gram", ingredientId: ingCokelat.id },
        ],
      },
    },
  });

  // 13. Transfer Distribusi Antar Cabang
  await prisma.branchTransfer.create({
    data: {
      businessId: business.id,
      createdById: gudangUser.id,
      transferNumber: "TRF-OUT-202611-01",
      origin: "Central Kitchen Senopati (Hub)",
      destination: "Cabang Kopi Kenangan SCBD Lot 8",
      driver: "Wahyu Hidayat (Motor Kurir Hub)",
      vehicleInfo: "Yamaha NMAX Box (B 4210 SCM)",
      departureTime: "10:30 WIB",
      eta: "11:00 WIB (Tiba)",
      status: "received",
      notes: "Diterima lengkap oleh Supervisor Outlet SCBD",
      receivedAt: new Date(Date.now() - 3600 * 1000),
      items: {
        create: [
          { name: "Cold Brew Concentrate", quantity: 20, unit: "liter" },
          { name: "Sirup Karamel Premium", quantity: 5, unit: "liter" },
          { name: "Paper Cup 12oz BAPER", quantity: 200, unit: "pcs", ingredientId: ingCup.id },
        ],
      },
    },
  });

  await prisma.branchTransfer.create({
    data: {
      businessId: business.id,
      createdById: gudangUser.id,
      transferNumber: "TRF-OUT-202611-02",
      origin: "Central Kitchen Senopati (Hub)",
      destination: "Cabang Kopi Kenangan Kemang Raya",
      driver: "Rudi Hartono (Van Delivery Hub)",
      vehicleInfo: "Gran Max Blind Van (B 9811 KLC)",
      departureTime: "13:45 WIB",
      eta: "14:20 WIB (OTW)",
      status: "shipping",
      notes: "Suhu box chiller mobil terjaga 3.5°C",
      items: {
        create: [
          { name: "Fresh Milk Pasteurisasi", quantity: 40, unit: "liter", ingredientId: ingSusu.id },
          { name: "Biji Kopi Arabika Lintong", quantity: 15, unit: "kg", ingredientId: ingKopi.id },
        ],
      },
    },
  });

  console.log("🚚 Data batch produksi & distribusi antar gerai berhasil dibuat.");
  console.log("✅ SEEDING SELESAI 100%! Seluruh akun, outlet, menu, resep, dan rantai pasok siap digunakan.");
}

main()
  .catch((e) => {
    console.error("❌ Gagal Seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
