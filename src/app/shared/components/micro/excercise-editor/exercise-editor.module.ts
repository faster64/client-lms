import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseEditorComponent } from './exercise-editor.component';
import { DxHtmlEditorModule } from 'devextreme-angular';



@NgModule({
  declarations: [
    ExerciseEditorComponent
  ],
  imports: [
    CommonModule,
    DxHtmlEditorModule
  ],
  exports: [ExerciseEditorComponent]
})
export class ExerciseEditorModule { }
