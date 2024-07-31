import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from './product-details.component';

@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [CommonModule, BrowserModule, HttpClientModule],
})
export class ProductDetailsModule {}
