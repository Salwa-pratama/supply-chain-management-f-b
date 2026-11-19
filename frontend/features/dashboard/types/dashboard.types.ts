import { OrderItemData } from "../../orders/types/orders.types";

export interface OwnerOverviewData {
  revenueThisMonth: number;
  transactionsThisMonth: number;
  criticalStockCount: number;
  activePoCount: number;
  recentOrders: OrderItemData[];
}

export interface ScmPipelineData {
  stage1_supplier: number;
  stage2_warehouse_qc: number;
  stage3_kitchen_production: number;
  stage4_outlet_pos: number;
  stage5_customers: number;
}

export interface AdminPlatformStatsData {
  totalBusinesses: number;
  totalSuppliers: number;
  totalUsers: number;
  platformGmv: number;
  users: {
    id: string;
    email: string;
    name: string;
    role: string;
    isActive: boolean;
    createdAt: string;
  }[];
}
