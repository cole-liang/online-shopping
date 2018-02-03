import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { AppUser } from './../models/app-user';
import { AuthService } from './../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css']
})
export class MainNavbarComponent implements OnInit, OnDestroy{
  appUser: AppUser;
  subscription: Subscription;
  cart$;

  constructor(private auth: AuthService,
              private cartService: ShoppingCartService) {
  }

  async ngOnInit(){
    this.subscription = this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.cartService.getCart();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
