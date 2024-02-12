import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { DxHtmlEditorModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    EditorComponent
  ],
  imports: [
    CommonModule,
    DxHtmlEditorModule,
  ],
  exports: [EditorComponent]
})
export class EditorModule { }
