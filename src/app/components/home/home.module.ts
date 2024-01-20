import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ContactModule } from '../contact/contact.module';
import { BannerModule } from '../banner/banner.module';
import { AboutWeModule } from '../about-we/about-we.module';
import { CourseModule } from '../course/course.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TranslateModule,
    BannerModule,
    ContactModule,
    AboutWeModule,
    CourseModule
  ]
})
export class HomeModule { }
