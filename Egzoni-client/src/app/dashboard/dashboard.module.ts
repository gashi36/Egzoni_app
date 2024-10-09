import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChunkPipe } from '../chunk.pipe';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxChartsModule,
    FormsModule,

  ]
})
export class DashboardModule { }
