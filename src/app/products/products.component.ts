import { ShoppingCart } from './../models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "./../services/product.service";
import { Component, OnInit } from "@angular/core";
import { Product } from "../models/product";
import { ShoppingCartService } from "../services/shopping-cart.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  shoppingCart$: Observable<ShoppingCart>;
  subscription: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService
  ) { }

  async ngOnInit() {
    this.shoppingCart$ = await this.cartService.getCart();
    this.populateProduct();
  }

  private filter() {
    this.route.queryParamMap.subscribe(params => {
      this.category = params.get("category");

      this.filteredProducts = this.category
        ? this.products.filter(p => p.category === this.category)
        : this.products;
    });
  }

  private populateProduct(){
    this.productService.getAll().subscribe(products => {
      this.products = products;
      this.filter();
    });
  }
}
