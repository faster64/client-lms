import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgOtpInputComponent } from 'ng-otp-input';

@Component({
  selector: 'app-otp-box',
  templateUrl: './otp-box.component.html',
  styleUrls: ['./otp-box.component.scss']
})
export class OtpBoxComponent implements AfterViewInit {

  config = { length: 4, allowNumbersOnly: true, isPasswordInput: false, disableAutoFocus: false, placeholder: '' };

  emitting = false;

  @Input()
  length = 4;

  @Input()
  allowNumbersOnly = false;

  @Input()
  isPasswordInput = false;

  @Input()
  disableAutoFocus = false;

  @Input()
  placeholder = "";

  @Output()
  onChanged = new EventEmitter<any>();

  @ViewChild(NgOtpInputComponent, { static: false }) otpInput!: NgOtpInputComponent;


  ngAfterViewInit(): void {
    const inputs = document.querySelectorAll('.otp-input');
    for (let i = 0; i < inputs.length; i++) {
      (inputs[i] as any).placeholder = "-";
    }
  }


  onChange(event: string) {
    if (!this.emitting) {
      this.onChanged.emit(event);
      this.emitting = true;
    }

    setTimeout(() => {
      this.emitting = false;
    }, 100);
  }
}

