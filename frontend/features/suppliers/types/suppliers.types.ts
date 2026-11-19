export interface SupplierItem {
  id: string;
  supplierId: string;
  name: string;
  unit: string;
  price: string | number;
  isAvailable: boolean;
  stockQty?: string | number;
  stock?: string | number;
  category?: string;
  minOrder?: number | string;
  leadTimeDays?: number | string;
}

export interface SupplierData {
  id: string;
  userId?: string;
  name: string;
  category?: string;
  phone?: string;
  address?: string;
  isActive: boolean;
  email?: string;
  rating?: number | string;
  isVerified?: boolean;
  supplierItems?: SupplierItem[];
  items?: SupplierItem[];
}

export interface CreateSupplierItemPayload {
  name: string;
  unit: string;
  price: number;
  stockQty?: number;
  stock?: number;
  isAvailable?: boolean;
  minOrder?: number;
  leadTimeDays?: number;
  category?: string;
}
