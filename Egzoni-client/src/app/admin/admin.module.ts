import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { RouterModule } from '@angular/router';
import { CarpetsComponent } from '../carpets/carpets.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,

    //   ApolloModule,
    //   HttpClientModule,
    //   RouterModule.forRoot([{ path: 'carpets', component: CarpetsComponent }]),
  ],
  declarations: [AdminComponent],
})
export class AdminModule {}
