import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './Shop.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [BrowserModule, CommonModule, NgbModule],
  declarations: [ShopComponent],
  exports: [ShopComponent],
})
export class ShopModule {}
