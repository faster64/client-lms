import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppFooterModule } from './components/app-footer/app-footer.module';
import { AppHeaderModule } from './components/app-header/app-header.module';
import './shared/extension-methods/array-extension';
import './shared/extension-methods/console-extension';
import './shared/extension-methods/string-extension';
import { MessageBoxModule } from './shared/message-box/message-box.module';
import { SnackbarModule } from './shared/snackbar/snackbar.module';
import { RequestHandlingInterceptor } from './shared/core/request.interceptor';
import { CmsSidebarModule } from './cms/cms-sidebar/cms-sidebar.module';
import { CmsHeaderModule } from './cms/cms-header/cms-header.module';
import { BalloonModule } from './components/balloon/balloon.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: environment.default_language,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    // BrowserTransferStateModule,
    MatProgressBarModule,
    SnackbarModule,
    MessageBoxModule,
    CmsSidebarModule,
    CmsHeaderModule,
    AppHeaderModule,
    AppFooterModule,
    BalloonModule
  ],
  providers: [
    // {
    //   provide: ErrorHandler,
    //   useClass: GlobalErrorHandler,
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestHandlingInterceptor,
      multi: true
    },
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: null
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
