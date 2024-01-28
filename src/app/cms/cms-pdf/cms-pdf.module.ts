import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsPdfComponent } from './cms-pdf.component';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [
    CmsPdfComponent
  ],
  imports: [
    CommonModule,
    MatTooltipModule
  ],
  exports: [CmsPdfComponent]
})
export class CmsPdfModule { }
