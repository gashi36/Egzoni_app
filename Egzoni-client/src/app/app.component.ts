import { Component, OnInit } from '@angular/core';
import { AddProductssGQL, GetProductsGQL, Product } from '../generated/graphql';
import { ThisReceiver } from '@angular/compiler';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}
}
