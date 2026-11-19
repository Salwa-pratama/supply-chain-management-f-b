export interface BranchTransferItem {
  id: string;
  transferId: string;
  ingredientId?: string | null;
  name: string;
  quantity: string | number;
  unit: string;
}

export interface BranchTransfer {
  id: string;
  businessId: string;
  createdById?: string | null;
  transferNumber: string;
  origin: string;
  destination: string;
  driver?: string | null;
  vehicleInfo?: string | null;
  departureTime?: string | null;
  eta?: string | null;
  status: string; // preparing, shipping, received, cancelled
  notes?: string | null;
  createdAt: string;
  receivedAt?: string | null;
  items: BranchTransferItem[];
  createdBy?: { id: string; name: string; role: string } | null;
}

export interface CreateTransferPayload {
  origin: string;
  destination: string;
  driver?: string;
  vehicleInfo?: string;
  departureTime?: string;
  eta?: string;
  notes?: string;
  items?: {
    name: string;
    quantity: number;
    unit: string;
    ingredientId?: string;
  }[];
}
