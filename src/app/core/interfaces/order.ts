import {OrderItem} from './order-item';

export interface Order {
  id: number;
  totalValue: number;
  status: string;
  items: {
    product: {
      name: string;
      imageUrl: string;
      brand: {
        name: string;
      };
    };
    quantity: number;
    priceUnit: number;
  }[];
}
