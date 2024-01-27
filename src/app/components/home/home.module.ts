import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TicketModule } from '../ticket/ticket.module';
import { BannerModule } from '../banner/banner.module';
import { AboutWeModule } from '../about-we/about-we.module';
import { CourseModule } from '../course/course.module';
import { TranslateModule } from '@ngx-translate/core';
import { BaseLoadingModule } from 'src/app/shared/components/micro/loading/loading.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TranslateModule,
    BannerModule,
    TicketModule,
    AboutWeModule,
    CourseModule,
    BaseLoadingModule
  ]
})
export class HomeModule { }
