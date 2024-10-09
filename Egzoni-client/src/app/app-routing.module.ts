import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarpetsComponent } from './carpets/carpets.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard'; // Ensure the path is correct
import { ShopComponent } from './shop/shop.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalesComponent } from './sales/sales.component';
import { ChunkPipe } from './chunk.pipe';

const routes: Routes = [
  { path: 'carpets', component: CarpetsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'sales', component: SalesComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'home', component: HomeComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule],
  declarations: [
  ],
})
export class AppRoutingModule { }
