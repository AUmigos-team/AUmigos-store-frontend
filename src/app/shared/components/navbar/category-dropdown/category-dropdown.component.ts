import { Component, Input } from '@angular/core';
import {CommonModule} from '@angular/common';
import {Subcategory} from '../../../../core/interfaces/subcategory';

@Component({
  selector: 'app-category-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-dropdown.component.html',
  styleUrls: ['./category-dropdown.component.css']
})
export class CategoryDropdownComponent {
  @Input() name!: string;
  @Input() subcategories: Subcategory[] = [];
  @Input() highlightColor: string = '#ccc';

  hovering = false;
}
