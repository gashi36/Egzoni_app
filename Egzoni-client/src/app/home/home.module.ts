import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ChunkPipe } from '../chunk.pipe';
import { TagModule } from 'primeng/tag';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { CarouselModule } from 'primeng/carousel';



@NgModule({
  declarations: [HomeComponent, ChunkPipe],
  imports: [CommonModule, RouterModule, TagModule, BrowserAnimationsModule, ToastrModule.forRoot(), MatCardModule, CarouselModule,],
})
export class HomeModule { }
