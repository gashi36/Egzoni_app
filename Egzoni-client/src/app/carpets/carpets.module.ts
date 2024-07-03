import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarpetsComponent } from './carpets.component';
import { CarpetsRoutingModule } from './carpets-routing.module';
import { RouterModule } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { AdminModule } from '../admin/admin.module';
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
export class CarpetsModule {}
