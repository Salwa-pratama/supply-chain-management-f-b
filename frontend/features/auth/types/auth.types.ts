export type UserRole = "owner" | "pemasok" | "kasir" | "manajer_gudang";

export interface UserMembershipSummary {
  id: string;
  businessId: string;
  branchId?: string | null;
  role: string;
  business?: { id: string; name: string } | null;
  branch?: { id: string; name: string; code?: string | null; address?: string | null } | null;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole | string;
  isActive: boolean;
  createdAt: string;
  businessMembers?: UserMembershipSummary[];
}

export interface BusinessProfile {
  id: string;
  userId: string;
  name: string;
  category?: string | null;
  phoneBusiness?: string | null;
  address?: string | null;
  description?: string | null;
}

export interface SupplierProfile {
  id: string;
  userId?: string | null;
  name: string;
  category?: string | null;
  phone?: string | null;
  address?: string | null;
  isActive: boolean;
}

export interface AuthResponseData {
  user: UserProfile;
  business?: BusinessProfile | null;
  supplier?: SupplierProfile | null;
  accessToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  businessName?: string;
  category?: string;
  phone?: string;
  whatsapp?: string;
}
