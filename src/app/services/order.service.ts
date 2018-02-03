import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase,
              private cartService: ShoppingCartService) { }

  private ordersMapping(orders$: Observable<any>){
    return orders$.map(action => {
      return action.map(item => {
        const key = item.payload.key;
        const data = {key, ...item.payload.val()};
        return data;
      })
    });
  }

  getAll(){
    return this.ordersMapping(
      this.db.list('/orders/').snapshotChanges()
    );
  }

  getOrdersByUser(userId: string){
    return this.ordersMapping(
      this.db.list(
        '/orders', 
        ref => ref.orderByChild('userId').equalTo(userId)
      ).snapshotChanges()
    );
  }

  getOrderByOrderId(orderId: string){
    return this.db.object('/orders/' + orderId).valueChanges();
  }

  updateOrder(order){
    let result = this.db.list('/orders/').push(order);
    this.cartService.clearCart();
    return result;
  }
}
