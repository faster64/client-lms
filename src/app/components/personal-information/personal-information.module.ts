import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalInformationRoutingModule } from './personal-information-routing.module';
import { PersonalInformationComponent } from './personal-information.component';
import { BaseLoadingModule } from 'src/app/shared/components/micro/loading/loading.module';
import { DxTextBoxModule } from 'devextreme-angular';
import { ClassSelectorModule } from 'src/app/shared/components/micro/class-selector/class-selector.module';
import { BaseUploaderModule } from 'src/app/shared/components/micro/uploader/uploader.module';
import { BaseButtonModule } from 'src/app/shared/components/micro/button/button.module';


@NgModule({
  declarations: [
    PersonalInformationComponent
  ],
  imports: [
    CommonModule,
    PersonalInformationRoutingModule,
    BaseLoadingModule,
    DxTextBoxModule,
    ClassSelectorModule,
    BaseUploaderModule,
    BaseButtonModule
  ]
})
export class PersonalInformationModule { }
