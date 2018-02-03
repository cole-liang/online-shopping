import { ShoppingCart } from './../models/shopping-cart';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'check-out-form',
  templateUrl: './check-out-form.component.html',
  styleUrls: ['./check-out-form.component.css']
})
export class CheckOutFormComponent implements OnInit {
  @Input('cart') cart: ShoppingCart;
  shipping = {}; 
  subscription: Subscription;
  userId: string;

  constructor(private orderService:OrderService,
              private authService: AuthService,
              private router: Router) { }

  async ngOnInit() {
    this.subscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  
  async placeOrder() {
    let order = new Order(this.shipping, this.cart, this.userId);
    let result = await this.orderService.updateOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }    
}
