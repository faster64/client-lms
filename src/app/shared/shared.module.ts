import { DragDropModule } from "@angular/cdk/drag-drop";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { DxFileUploaderModule, DxPopoverModule, DxProgressBarModule, DxTextBoxModule } from "devextreme-angular";
import { FileUploadModule } from "ng2-file-upload";
import { BaseButtonModule } from "./components/micro/button/button.module";
import { FolderPickerComponent } from './components/micro/folder-picker/folder-picker.component';
import { HighlightComponent } from './components/micro/highlight/highlight.component';
import { BaseLoadingModule } from "./components/micro/loading/loading.module";
import { MessengerComponent } from "./components/micro/messenger/messenger.component";
import { NotificationComponent } from "./components/micro/notification/notification.component";
import { OnlineUserComponent } from "./components/micro/online-user/online-user.component";
import { TypingComponent } from "./components/micro/typing/typing.component";
import { CountDownPipe } from "./pipes/count-down.pipe";
import { DateTimeVietnamPipe } from "./pipes/date-time.pipe";
import { DateVietnamPipe } from "./pipes/date.pipe";
import { NumberFormatPipe } from "./pipes/number-format.pipe";
import { PoDatePipe } from "./pipes/po-date.pipe";
import { TimePipe } from "./pipes/time.pipe";

@NgModule({
  declarations: [
    DateVietnamPipe,
    DateTimeVietnamPipe,
    PoDatePipe,
    TimePipe,
    CountDownPipe,
    NumberFormatPipe,
    NotificationComponent,
    OnlineUserComponent,
    MessengerComponent,
    TypingComponent,
    HighlightComponent,
    FolderPickerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BaseLoadingModule,
    BaseButtonModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    DxFileUploaderModule,
    DxProgressBarModule,
    DxPopoverModule,
    DxTextBoxModule,
    TranslateModule,
    FormsModule,
    FileUploadModule,
    ScrollingModule
  ],
  exports: [
    BaseLoadingModule,
    DateVietnamPipe,
    DateTimeVietnamPipe,
    PoDatePipe,
    TimePipe,
    CountDownPipe,
    NumberFormatPipe,
    NotificationComponent,
    MatProgressBarModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    DragDropModule,
    DxFileUploaderModule,
    DxProgressBarModule,
    OnlineUserComponent,
    MessengerComponent,
    TypingComponent,
    HighlightComponent,
    FolderPickerComponent
  ]
})
export class SharedModule { }
