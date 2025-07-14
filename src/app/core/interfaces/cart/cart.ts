import {CartItem} from './cart-item';

export interface Cart {
  id: number;
  items: CartItem[];
  totalValue: number;
}

