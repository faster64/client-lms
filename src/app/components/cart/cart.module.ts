import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { DxTextBoxModule } from 'devextreme-angular';
import { BaseLoadingModule } from 'src/app/shared/components/micro/loading/loading.module';
import { BaseButtonModule } from 'src/app/shared/components/micro/button/button.module';


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    TranslateModule,
    PipesModule,
    DxTextBoxModule,
    BaseLoadingModule,
    BaseButtonModule
  ]
})
export class CartModule { }
