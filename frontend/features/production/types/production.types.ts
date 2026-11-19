export interface KitchenBatchItem {
  id: string;
  batchId: string;
  ingredientId?: string | null;
  name: string;
  quantity: string | number;
  unit: string;
}

export interface KitchenBatch {
  id: string;
  businessId: string;
  createdById?: string | null;
  batchNumber: string;
  recipeName: string;
  station?: string | null;
  operator?: string | null;
  plannedYield?: string | null;
  actualYield?: string | null;
  progress: number;
  status: string; // in_progress, completed, cancelled
  notes?: string | null;
  createdAt: string;
  completedAt?: string | null;
  items: KitchenBatchItem[];
  createdBy?: { id: string; name: string; role: string } | null;
}

export interface CreateBatchPayload {
  recipeName: string;
  station?: string;
  operator?: string;
  plannedYield?: string;
  notes?: string;
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
