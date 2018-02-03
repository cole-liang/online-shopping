import { CategoryService } from './../../services/category.service';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css']
})
export class ProductsFilterComponent{
  @Input('category') category;
  categories$;
  constructor(private categoryService: CategoryService) {
    this.categories$ = categoryService.getAll(); 
  }

}
