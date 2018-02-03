import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order$;

  constructor() { }

  ngOnInit() {
  }

}
