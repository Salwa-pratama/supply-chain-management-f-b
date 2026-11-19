import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { BusinessService } from "../business/business.service";

@Injectable()
export class DashboardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly businessService: BusinessService
  ) {}

  /**
   * Metrik Utama untuk Dashboard Pemilik Bisnis (/pemilik/dashboard)
   */
  async getOwnerOverview(userId: string) {
    const businessId = await this.businessService.getBusinessForUser(userId);

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // 1. Total Penjualan Bulan Ini
    const orders = await this.prisma.order.findMany({
      where: {
        businessId,
        status: "paid",
        createdAt: { gte: startOfMonth },
      },
    });

    const totalRevenue = orders.reduce((acc, curr) => acc + Number(curr.totalAmount), 0);
    const totalTransactions = orders.length;

    // 2. Bahan Baku Kritis
    const ingredients = await this.prisma.ingredient.findMany({
      where: { businessId },
    });

    const criticalIngredients = ingredients.filter(
      (ing) => Number(ing.stock) <= Number(ing.minStock)
    );

    // 3. Purchase Orders Aktif (sent, confirmed, shipped)
    const activePurchaseOrders = await this.prisma.purchaseOrder.findMany({
      where: {
        businessId,
        status: { in: ["sent", "confirmed", "shipped"] },
      },
    });

    // 4. Aktivitas Terkini (Order & PO & Mutasi)
    const recentOrders = await this.prisma.order.findMany({
      where: { businessId },
      include: { orderItems: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    return {
      revenueThisMonth: totalRevenue,
      transactionsThisMonth: totalTransactions,
      criticalStockCount: criticalIngredients.length,
      activePoCount: activePurchaseOrders.length,
      recentOrders,
    };
  }

  /**
   * Data Alur 5 Tahap Rantai Pasok (/pemilik/monitoring)
   */
  async getScmPipeline(userId: string) {
    const businessId = await this.businessService.getBusinessForUser(userId);

    // Stage 1: Pemasok (PO Dikirim & Dikonfirmasi)
    const stageSupplier = await this.prisma.purchaseOrder.count({
      where: { businessId, status: { in: ["sent", "confirmed"] } },
    });

    // Stage 2: Gudang & QC (PO Berjalan & Stok Kritis)
    const stageWarehouse = await this.prisma.purchaseOrder.count({
      where: { businessId, status: "shipped" },
    });

    // Stage 3: Produksi (Total Produk Aktif Terjual Hari Ini)
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const stageKitchen = await this.prisma.orderItem.count({
      where: {
        order: { businessId, status: "paid", createdAt: { gte: startOfDay } },
      },
    });

    // Stage 4: Kasir & POS (Transaksi Berhasil Hari Ini)
    const stagePos = await this.prisma.order.count({
      where: { businessId, createdAt: { gte: startOfDay } },
    });

    // Stage 5: Pelanggan & WA (Total Customer Terdaftar)
    const stageCustomers = await this.prisma.customer.count({
      where: { businessId },
    });

    return {
      stage1_supplier: stageSupplier,
      stage2_warehouse_qc: stageWarehouse,
      stage3_kitchen_production: stageKitchen,
      stage4_outlet_pos: stagePos,
      stage5_customers: stageCustomers,
    };
  }

  /**
   * Metrik Platform untuk Super Admin (/admin/dashboard)
   */
  async getAdminPlatformStats() {
    const totalBusinesses = await this.prisma.business.count();
    const totalSuppliers = await this.prisma.supplier.count();
    const totalUsers = await this.prisma.user.count();

    const allOrders = await this.prisma.order.findMany({
      where: { status: "paid" },
      select: { totalAmount: true },
    });

    const platformGmv = allOrders.reduce((acc, curr) => acc + Number(curr.totalAmount), 0);

    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    return {
      totalBusinesses,
      totalSuppliers,
      totalUsers,
      platformGmv,
      users,
    };
  }
}
