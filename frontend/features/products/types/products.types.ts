export interface IngredientItem {
  id: string;
  name: string;
  unit: string;
  stock: string | number;
  minStock: string | number;
  category?: string | null;
  locationRack?: string | null;
}

export interface ProductIngredientRelation {
  id: string;
  productId: string;
  ingredientId: string;
  qtyPerUnit: string | number;
  ingredient: IngredientItem;
}

export interface ProductItem {
  id: string;
  businessId: string;
  name: string;
  description?: string | null;
  price: string | number;
  category?: string | null;
  isAvailable: boolean;
  productIngredients?: ProductIngredientRelation[];
}
