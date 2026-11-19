export interface InventoryItem {
  id: string;
  businessId: string;
  preferredSupplierId?: string | null;
  name: string;
  unit: string;
  stock: string | number;
  minStock: string | number;
  category?: string | null;
  locationRack?: string | null;
  expiryDate?: string | null;
  status: "aman" | "menipis" | "kritis";
  preferredSupplier?: {
    id: string;
    name: string;
    phone?: string | null;
  } | null;
}

export interface StockMovementItem {
  id: string;
  ingredientId: string;
  createdById?: string | null;
  type: "in" | "out" | "adjust";
  qty: string | number;
  referenceId?: string | null;
  createdAt: string;
  ingredient?: {
    id: string;
    name: string;
    unit: string;
  };
  createdBy?: {
    id: string;
    name: string;
    role: string;
  } | null;
}
