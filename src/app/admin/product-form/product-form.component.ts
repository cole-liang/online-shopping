import { Router, ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { CategoryService } from "../../services/category.service";
import { ProductService } from "../../services/product.service";
import "rxjs/add/operator/take";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent {
  categories$;
  product = {};
  id;

  constructor(
    categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id)
      this.productService
        .getProduct(this.id)
        .take(1)
        .subscribe(p => (this.product = p));
  }

  save(product) {
    if (this.id) 
      this.productService.update(this.id, product);
    else 
      this.productService.create(product);

    this.router.navigate(["/admin/products"]);
  }

  delete() {
    if (!confirm("Are you sure to delete the product?")) return;

    this.productService.delete(this.id);
    this.router.navigate(["/admin/products"]);
  }

  back(){
    this.router.navigate(["/admin/products"]);
  }
}
