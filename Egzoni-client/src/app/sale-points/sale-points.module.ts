import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { SalePointsComponent } from './sale-points.component';
import { Router, RouterLink, RouterModule } from '@angular/router';

@NgModule({
  declarations: [SalePointsComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterLink,
    RouterModule,
  ],
  exports: [SalePointsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SalePointsModule {}
