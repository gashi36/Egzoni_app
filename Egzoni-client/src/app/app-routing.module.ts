import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarpetsComponent } from './carpets/carpets.component';
import { AdminComponent } from './admin/admin.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: AdminComponent,
//   },
//   { path: '', redirectTo: '/admin', pathMatch: 'full' },

//   {
//     path: 'carpets',
//     loadChildren: () =>
//       import('./carpets/carpets.module').then((m) => m.CarpetsModule),
//   },
// ];
const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'carpets',
    component: CarpetsComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
