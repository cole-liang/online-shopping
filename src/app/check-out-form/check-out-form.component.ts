import { MatSnackBar } from '@angular/material/snack-bar';
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
              private router: Router,
              private snackBar: MatSnackBar) { }

  async ngOnInit() {
    this.subscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  
  placeOrder() {
    let order = new Order(this.shipping, this.cart, this.userId);
    this.orderService.updateOrder(order).then(response => {
      this.snackBar.open("Successfully ordered!", "Got it", {
        duration: 4000,
      })
      this.router.navigate(['/']);
    }, error => {
      this.snackBar.open("Fail to order, please check your network.", "Got it", {
        duration: 4000,
      })
    });
    
  }    
}
