export interface OrderItem {
  product: {
    name: string;
    imageUrl: string;
    brand: { name: string };
    price: number;
  };
  quantity: number;
}
