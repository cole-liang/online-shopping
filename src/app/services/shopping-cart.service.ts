import { ShoppingCart } from './../models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object("/shopping-cart/" + cartId).snapshotChanges()
    .map(cart => new ShoppingCart(cart.payload.val().items));
  }
  
  async addToCart(product: Product){
    this.updateItem(product, 1);
  }
  
  async removeFromCart(product: Product){
    this.updateItem(product, -1);
  }
  
  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-cart/' + cartId + "/items/").remove();
  }

  private getItem(cartId: string, productId: string){
    return this.db.object("/shopping-cart/" + cartId + "/items/" + productId);
  }

  private create(){
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreateCartId(){
    let cartId = localStorage.getItem("cartId");
    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number){
    let cartId = await this.getOrCreateCartId();
    let itemObject = this.getItem(cartId, product.key);
    
    itemObject.snapshotChanges().take(1).subscribe(item => {
      const itemPayload = item.payload.val();
      let qty = (itemPayload? itemPayload.quantity : 0) + change;

      if(qty === 0) itemObject.remove();
      else itemObject.update({ 
              title: product.title,
              category: product.category,
              price: product.price,
              imageUrl: product.imageUrl,
              quantity: qty
            });
    })
  }

}
