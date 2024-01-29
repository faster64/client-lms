import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalInformationRoutingModule } from './personal-information-routing.module';
import { PersonalInformationComponent } from './personal-information.component';
import { BaseLoadingModule } from 'src/app/shared/components/micro/loading/loading.module';
import { DxTextBoxModule } from 'devextreme-angular';
import { ClassSelectorModule } from 'src/app/shared/components/micro/class-selector/class-selector.module';


@NgModule({
  declarations: [
    PersonalInformationComponent
  ],
  imports: [
    CommonModule,
    PersonalInformationRoutingModule,
    BaseLoadingModule,
    DxTextBoxModule,
    ClassSelectorModule
  ]
})
export class PersonalInformationModule { }
