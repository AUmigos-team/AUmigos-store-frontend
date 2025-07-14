import {Subcategory} from './subcategory';
import {Brand} from './band';
import {Stock} from './stock';
import {Review} from './review';

export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  subcategory: Subcategory;
  averageRating: number | null;
  brand: Brand;
  stocks: Stock[];
  reviews: Review[];
}
