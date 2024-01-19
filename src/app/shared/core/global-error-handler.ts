import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { Message } from 'src/app/models/message';
import { environment } from 'src/environments/environment';
import { MessageBox } from '../components/element/message-box/message-box.component';
import { DeviceType } from '../enumerations/device.enum';
import { SharedService } from '../services/base/shared.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private zone: NgZone,
  ) { }

  handleError(error: any) {
    // Check if it's an error from an HTTP response
    // if (!(error instanceof HttpErrorResponse)) {
    //     error = error.rejection; // get the error object
    // }
    if (error) {
      if (!environment.production) {
        this.zone.run(() => {
          const msg = error ? error.message ? error.message : error : '';
          if (SharedService.DeviceType == DeviceType.Mobile) {
            MessageBox.information(new Message(null, { content: `[Fix this error]: ${msg}` }))
          }
        });
      }
      try {
        if ((error + '').includes('ChunkLoadError')) {
          MessageBox.information(new Message(this, { content: 'Đã có phiên bản mới, tải lại trang để tiếp tục sử dụng' }, () => window.location.reload()));
        }
      } catch (e) {
        console.err('resolve failed: ', e);
      }
      console.err('Error from global error handler', error);
    }
  }
}
