import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarpetsComponent } from './carpets/carpets.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard'; // Ensure the path is correct

const routes: Routes = [
  { path: 'carpets', component: CarpetsComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: 'admin' },
  // Additional routes can be added here if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
