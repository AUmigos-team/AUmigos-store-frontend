import {Subcategory} from './subcategory';

export interface Category {
  id: number;
  name: string;
  slug?: string;
  subcategories?: Subcategory[];
  color?: string;
}
