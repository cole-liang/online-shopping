import { AuthService } from './../services/auth.service';
import { AppUser } from './../models/app-user';
import { OrderService } from './../services/order.service';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order$;
  previousUrl: string;
  appUser: AppUser;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    let orderId = this.route.snapshot.paramMap.get("id");
    this.order$ = this.orderService.getOrderByOrderId(orderId);
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  return(){
    this.location.back();
  }

  delete(orderId: string){
    this.orderService.deleteOrder(orderId).then(response => {
      this.snackBar.open("Successfully deleted!", "Got it", {
        duration: 4000,
      });
    }, error => {
      this.snackBar.open("Fail to delete, please check your network.", "Got it", {
        duration: 4000,
      });
    });
    
    this.return();
  }

}
