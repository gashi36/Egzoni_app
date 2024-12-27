import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarpetsModule } from './carpets/carpets.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { AdminModule } from './admin/admin.module';
import { ShopModule } from './shop/shop.module';
import { ProductDetailsModule } from './product-details/product-details.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { AuthGuard } from './auth.guard';
import { CheckoutModule } from './checkout/checkout.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import for toastr animations
import { OverlayModule } from '@angular/cdk/overlay';
import { DashboardModule } from './dashboard/dashboard.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SalesModule } from './sales/sales.module';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeModule } from './home/home.module'; // Import HomeModule
import { ChunkPipe } from './chunk.pipe';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [AppComponent],
  imports: [
    MatAutocompleteModule,
    MatInputModule,
    HomeModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    GraphQLModule,
    GoogleMapsModule,
    AdminModule,
    ShopModule,
    ProductDetailsModule,
    CarpetsModule,
    CheckoutModule,
    MatSnackBarModule,
    OverlayModule,
    DashboardModule,
    NgxChartsModule,
    SalesModule,
    ToastrModule,
    CurrencyPipe,
    DatePipe
  ],
  providers: [AuthGuard, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule { }
