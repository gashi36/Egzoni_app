import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarpetsComponent } from './carpets.component';
import { CarpetsRoutingModule } from './carpets-routing.module';
import { AuthGuard } from '../auth.guard';

@NgModule({
  declarations: [CarpetsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CarpetsRoutingModule,
  ],
  providers: [AuthGuard],
})
export class CarpetsModule { }
