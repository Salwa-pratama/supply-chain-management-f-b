export type UserRole = "owner" | "pemasok" | "kasir" | "manajer_gudang";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole | string;
  isActive: boolean;
  createdAt: string;
}

export interface AuthResponseData {
  user: UserProfile;
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
}
