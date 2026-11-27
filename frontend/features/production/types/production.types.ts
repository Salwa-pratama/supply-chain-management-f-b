export interface KitchenBatchItem {
  id: string;
  batchId: string;
  ingredientId?: string | null;
  name: string;
  quantity: string | number;
  unit: string;
}

export interface KitchenBatchProduct {
  id: string;
  name: string;
  category?: string | null;
  price?: string | number;
}

export interface KitchenBatch {
  id: string;
  businessId: string;
  productId?: string | null;
  createdById?: string | null;
  batchNumber: string;
  recipeName: string;
  station?: string | null;
  operator?: string | null;
  targetQty?: number | null;
  plannedYield?: string | null;
  actualYield?: string | null;
  progress: number;
  status: string; // in_progress, completed, cancelled
  notes?: string | null;
  createdAt: string;
  completedAt?: string | null;
  items: KitchenBatchItem[];
  product?: KitchenBatchProduct | null;
  createdBy?: { id: string; name: string; role: string } | null;
}

export interface CreateBatchPayload {
  productId?: string;
  targetQty?: number;
  recipeName: string;
  station?: string;
  operator?: string;
  plannedYield?: string;
  notes?: string;
  deductIngredients?: boolean;
  items?: {
    name: string;
    quantity: number;
    unit: string;
    ingredientId?: string;
  }[];
}

export interface UpdateBatchStatusPayload {
  id: string;
  status: string;
  progress?: number;
  actualYield?: string;
  notes?: string;
}
