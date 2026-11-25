export interface OrderLineItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: string | number;
  product?: {
    id: string;
    name: string;
    category?: string | null;
  };
}

export interface OrderItemData {
  id: string;
  businessId: string;
  createdById?: string | null;
  source: string;
  orderType: string;
  totalAmount: string | number;
  discountAmount?: string | number | null;
  taxAmount?: string | number | null;
  paymentMethod?: string | null;
  paidAmount?: string | number | null;
  changeAmount?: string | number | null;
  status: string;
  createdAt: string;
  orderItems: OrderLineItem[];
  createdBy?: { id: string; name: string } | null;
}

export type OrderStatus =
  | "pending"
  | "paid"
  | "preparing"
  | "completed"
  | "cancelled";

export interface CreateOrderPayload {
  orderType?: string;
  totalAmount: number;
  discountAmount?: number;
  taxAmount?: number;
  paymentMethod?: string;
  paidAmount?: number;
  changeAmount?: number;
  status?: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
}

export interface KasirTodayStats {
  totalSales: number;
  transactionCount: number;
  avgTicket: number;
  paymentSplit: {
    qris: number;
    cash: number;
    edc: number;
  };
}
