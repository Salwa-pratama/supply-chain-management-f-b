export interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  businesses?: { id: string; name: string }[];
  businessMembers?: { role: string; business: { id: string; name: string } }[];
  supplier?: { id: string; name: string } | null;
}
