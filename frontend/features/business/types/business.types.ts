export interface BusinessOwner {
  id: string;
  name: string;
  email: string;
}

export interface BranchData {
  id: string;
  businessId: string;
  name: string;
  code?: string | null;
  address?: string | null;
  phone?: string | null;
  isMain: boolean;
  isActive: boolean;
  createdAt?: string;
  _count?: {
    members?: number;
  };
}

export interface BusinessMemberUser {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt?: string;
}

export interface BusinessMember {
  id: string;
  businessId: string;
  branchId?: string | null;
  userId: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  user: BusinessMemberUser;
  branch?: BranchData | null;
}

export interface BusinessData {
  id: string;
  name: string;
  category?: string;
  description?: string;
  address?: string;
  phoneBusiness?: string;
  createdAt: string;
  owner?: BusinessOwner;
  branches?: BranchData[];
  assignedBranch?: BranchData | null;
  members?: BusinessMember[];
  _count?: {
    products?: number;
    ingredients?: number;
    orders?: number;
    members?: number;
  };
}

export interface AddMemberPayload {
  name: string;
  email: string;
  password?: string;
  role: "kasir" | "manajer_gudang";
  branchId?: string;
}

export interface CreateBranchPayload {
  name: string;
  code?: string;
  address?: string;
  phone?: string;
  isMain?: boolean;
}
