import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import './shared/extension-methods/array-extension';
import './shared/extension-methods/console-extension';
import './shared/extension-methods/string-extension';
import { MessageBoxModule } from './shared/message-box/message-box.module';
import { SnackbarModule } from './shared/snackbar/snackbar.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AppHeaderModule } from './components/app-header/app-header.module';
import { AppFooterModule } from './components/app-footer/app-footer.module';

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
    AppHeaderModule,
    AppFooterModule
  ],
  providers: [
    // {
    //   provide: ErrorHandler,
    //   useClass: GlobalErrorHandler,
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: RequestHandlingInterceptor,
    //   multi: true
    // },
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
