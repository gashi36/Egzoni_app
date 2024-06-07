import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarpetsComponent } from './carpets.component';

const routes: Routes = [
  {
    path: '',
    component: CarpetsComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
      {
        path: 'asd',
        component: CarpetsComponent,
        title: 'Carpets',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarpetsRoutingModule {}
