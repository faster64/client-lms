import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DxCheckBoxModule, DxDataGridModule, DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { GirdComponent } from './gird.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { BaseButtonModule } from '../../micro/button/button.module';
import { BaseLoadingModule } from '../../micro/loading/loading.module';
import { MatMenuModule } from '@angular/material/menu';
import { CmsUserStatesModule } from 'src/app/cms/cms-user-states/cms-user-states.module';
import { CmsTicketStatesModule } from 'src/app/cms/cms-ticket-states/cms-ticket-states.module';

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
    MatMenuModule,
    PipesModule,
    BaseButtonModule,
    BaseLoadingModule,
    CmsUserStatesModule,
    CmsTicketStatesModule,
  ],
  exports: [GirdComponent]
})
export class GridModule { }
