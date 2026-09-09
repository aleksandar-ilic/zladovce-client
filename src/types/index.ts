export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  categorySlug: string;
  isFeatured: boolean;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CreateOrderPayload = {
  customerName: string;
  address: string;
  phone: string;
  email: string;
  notes?: string;
  items: Array<{ productId: number; quantity: number }>;
};

export type OrderResponse = {
  id: number;
  totalAmount: number;
  paymentMethod: string;
  createdAtUtc: string;
};
