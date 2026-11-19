export interface BusinessOwner {
  id: string;
  name: string;
  email: string;
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
  userId: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  user: BusinessMemberUser;
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
}
