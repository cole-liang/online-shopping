import { ProductService } from "./../../services/product.service";
import { Component } from "@angular/core";
import { Product } from "../../models/product";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { Subscription } from "rxjs/Subscription";
import { DataTableResource } from "angular5-data-table";

@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.css"]
})
export class AdminProductsComponent implements OnDestroy {
  products: Product[];
  subscription: Subscription;
  items: Product[] = [];
  itemCount: number;
  initialLimit = 10;
  dataTableResource: DataTableResource<Product>;

  constructor(private productService: ProductService) {
    this.subscription = this.productService
      .getAll()
      .subscribe(
        products => {
          this.products = products;
          this.initialDataTable(products);
        });
  }

  initialDataTable(products: Product[]){
    this.dataTableResource = new DataTableResource(products);
    this.dataTableResource.query({ offset: 0, limit: this.initialLimit })
      .then(items => this.items = items);
    this.dataTableResource.count()
      .then(count => this.itemCount = count);
  }

  filter(query: string) {
    let filteredProducts = query
      ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
      : this.products;

    this.initialDataTable( filteredProducts );
  }

  reloadItem(params){
    if(!this.dataTableResource) return;

    this.dataTableResource.query(params)
      .then(items => this.items = items);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
