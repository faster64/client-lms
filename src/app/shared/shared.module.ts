import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { DxFileUploaderModule, DxPopoverModule, DxProgressBarModule, DxTextBoxModule } from "devextreme-angular";
import { HeaderV1Component } from "./components/element/common-header-v1/header-v1.component";
import { CommonHeaderComponent } from "./components/element/common-header/common-header.component";
import { ResolverMarkComponent } from "./components/element/resolver-mark/resolver-mark.component";
import { UploadAvatarModule } from "./components/element/upload-avatar/upload-avatar.module";
import { BaseButtonModule } from "./components/micro/button/button.module";
import { HighlightComponent } from './components/micro/highlight/highlight.component';
// import { LauncherComponent } from "./components/micro/launcher/launcher.component";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { FormsModule } from "@angular/forms";
import { FileUploadModule } from "ng2-file-upload";
import { BaseLoadingModule } from "./components/micro/loading/loading.module";
import { MessengerComponent } from "./components/micro/messenger/messenger.component";
import { NotificationComponent } from "./components/micro/notification/notification.component";
import { OnlineUserComponent } from "./components/micro/online-user/online-user.component";
import { TypingComponent } from "./components/micro/typing/typing.component";
import { FolderPickerComponent } from './components/micro/folder-picker/folder-picker.component';
import { UserAccountBoxComponent } from './components/micro/user-account-box/user-account-box.component';
import { WeatherComponent } from './components/micro/weather/weather.component';
import { CountDownPipe } from "./pipes/count-down.pipe";
import { DateTimeVietnamPipe } from "./pipes/date-time.pipe";
import { DateVietnamPipe } from "./pipes/date.pipe";
import { NumberFormatPipe } from "./pipes/number-format.pipe";
import { PoDatePipe } from "./pipes/po-date.pipe";
import { TimePipe } from "./pipes/time.pipe";
import { AuthenModuleComponent } from './components/element/authen-module/authen-module.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { FilePreviewComponent } from './components/element/file-preview/file-preview.component';

@NgModule({
  declarations: [
    DateVietnamPipe,
    DateTimeVietnamPipe,
    PoDatePipe,
    TimePipe,
    CountDownPipe,
    NumberFormatPipe,
    CommonHeaderComponent,
    HeaderV1Component,
    ResolverMarkComponent,
    NotificationComponent,
    // LauncherComponent,
    OnlineUserComponent,
    MessengerComponent,
    TypingComponent,
    UserAccountBoxComponent,
    HighlightComponent,
    WeatherComponent,
    FolderPickerComponent,
    AuthenModuleComponent,
    FilePreviewComponent,
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
    UploadAvatarModule,
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
    CommonHeaderComponent,
    HeaderV1Component,
    ResolverMarkComponent,
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
    UploadAvatarModule,
    // LauncherComponent,
    OnlineUserComponent,
    MessengerComponent,
    TypingComponent,
    UserAccountBoxComponent,
    HighlightComponent,
    WeatherComponent,
    FolderPickerComponent,
    AuthenModuleComponent
  ]
})
export class SharedModule { }
