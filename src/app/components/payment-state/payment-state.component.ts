import { Component, Injector } from '@angular/core';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { SharedService } from 'src/app/shared/services/base/shared.service';
import { VNPayService } from 'src/app/shared/services/bill/vnpay.service';

@Component({
  selector: 'app-payment-state',
  templateUrl: './payment-state.component.html',
  styleUrls: ['./payment-state.component.scss']
})
export class PaymentStateComponent extends BaseComponent {

  codes = {};

  vnp_Amount = '';
  vnp_BankCode = '';
  vnp_BankTranNo = '';
  vnp_CardType = '';
  vnp_OrderInfo = '';
  vnp_PayDate = '';
  vnp_ResponseCode = '';
  vnp_TransactionNo = '';
  vnp_TxnRef = '';
  vnp_SecureHash = '';

  constructor(
    injector: Injector,
    public vnpayService: VNPayService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.getParams();
    this.getCodes();
    console.log(this.vnp_ResponseCode);
    if (this.vnp_ResponseCode == '00' || this.vnp_ResponseCode == '07') {
      SharedService.ClearCart();
    }
  }

  getParams() {
    console.log(this.activatedRoute.snapshot);
    this.vnp_Amount = this.activatedRoute.snapshot.queryParams['vnp_Amount'];
    this.vnp_BankCode = this.activatedRoute.snapshot.queryParams['vnp_BankCode'];
    this.vnp_BankTranNo = this.activatedRoute.snapshot.queryParams['vnp_BankTranNo'];
    this.vnp_CardType = this.activatedRoute.snapshot.queryParams['vnp_CardType'];
    this.vnp_OrderInfo = this.activatedRoute.snapshot.queryParams['vnp_OrderInfo'];
    this.vnp_PayDate = this.activatedRoute.snapshot.queryParams['vnp_PayDate'];
    this.vnp_ResponseCode = this.activatedRoute.snapshot.queryParams['vnp_ResponseCode'];
    this.vnp_TransactionNo = this.activatedRoute.snapshot.queryParams['vnp_TransactionNo'];
    this.vnp_TxnRef = this.activatedRoute.snapshot.queryParams['vnp_TxnRef'];
    this.vnp_SecureHash = this.activatedRoute.snapshot.queryParams['vnp_SecureHash'];
  }

  getCodes() {
    this.isLoading = true;
    this.vnpayService
      .getCodes()
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.isLoading = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.codes = resp.data;
        }
      })
  }
}
