import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarpetsComponent } from './carpets/carpets.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard'; // Ensure the path is correct
import { ShopComponent } from './shop/shop.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SalePointsComponent } from './sale-points/sale-points.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  { path: 'carpets', component: CarpetsComponent, canActivate: [AuthGuard] },
  { path: 'shop', component: ShopComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'home', component: HomeComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'sale-points', component: SalePointsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  // Additional routes can be added here if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
