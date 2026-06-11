export type Product = {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  imageUrls: string[];
  stock: number;
};

export type ProductInput = Omit<Product, '_id'>;

export type User = {
  id: string;
  username: string;
  name: string;
};

export type ProductResponse = {
  items: Product[];
  total: number;
  page: number;
  pages: number;
  categories: string[];
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type ProductFiltersState = {
  search: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  page: number;
};
