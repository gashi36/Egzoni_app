import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from '../app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule,
  ],
  declarations: [ShopComponent],
  exports: [ShopComponent],
})
export class ShopModule {}
