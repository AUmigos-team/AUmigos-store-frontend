import {Subcategory} from './subcategory';

export interface Category {
  id: number;
  name: string;
  subcategories?: Subcategory[];
  color?: string;
}
