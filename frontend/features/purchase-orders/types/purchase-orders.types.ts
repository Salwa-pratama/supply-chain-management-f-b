export interface PoLineItem {
  id: string;
  purchaseOrderId: string;
  supplierItemId?: string | null;
  ingredientId?: string | null;
  quantity: string | number;
  price: string | number;
  supplierItem?: {
    id: string;
    name: string;
    unit: string;
  } | null;
  ingredient?: {
    id: string;
    name: string;
    unit: string;
  } | null;
}

export interface PurchaseOrderItemData {
  id: string;
  businessId: string;
  supplierId: string;
  createdById?: string | null;
  status: "draft" | "sent" | "confirmed" | "shipped" | "received" | "cancelled";
  totalAmount: string | number;
  deliveryNote?: string | null;
  driverInfo?: string | null;
  qcStatus?: string | null;
  qcNotes?: string | null;
  receivedAt?: string | null;
  createdAt: string;
  supplier?: {
    id: string;
    name: string;
    phone?: string | null;
    address?: string | null;
  };
  business?: {
    id: string;
    name: string;
    address?: string | null;
  };
  purchaseOrderItems: PoLineItem[];
  createdBy?: { id: string; name: string; role: string } | null;
}

export interface CreatePoPayload {
  supplierId: string;
  totalAmount: number;
  items: {
    supplierItemId?: string;
    ingredientId?: string;
    quantity: number;
    price: number;
  }[];
}
