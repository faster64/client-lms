import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DxCheckBoxModule, DxDataGridModule, DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { GirdComponent } from './gird.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { BaseButtonModule } from '../../micro/button/button.module';

@NgModule({
  declarations: [
    GirdComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    DxDataGridModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    MatTooltipModule,
    MatPaginatorModule,
    PipesModule,
    BaseButtonModule
  ],
  exports: [GirdComponent]
})
export class GridModule { }
