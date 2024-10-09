import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ChunkPipe } from '../chunk.pipe';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [HomeComponent, ChunkPipe],
  imports: [CommonModule, RouterModule, CarouselModule, TagModule, BrowserAnimationsModule, ToastrModule.forRoot(),],
})
export class HomeModule { }
