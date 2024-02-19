import { Component, Injector } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base-component';

@Component({
  selector: 'app-paid-state',
  templateUrl: './paid-state.component.html',
  styleUrls: ['./paid-state.component.scss']
})
export class PaidStateComponent extends BaseComponent {

  vnp_Amount = '';
  vnp_BankCode = '';
  vnp_BankTranNo = '';
  vnp_CardType = '';
  vnp_OrderInfo = '';
  vnp_PayDate = '';
  vnpResponseCode = '';
  vnp_TransactionNo = '';
  vnp_TxnRef = '';
  vnp_SecureHash = '';

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    console.log(this.activatedRoute.snapshot);
    this.vnp_Amount = this.activatedRoute.snapshot.queryParams['vnp_Amount'];
    this.vnp_BankCode = this.activatedRoute.snapshot.queryParams['vnp_BankCode'];
    this.vnp_BankTranNo = this.activatedRoute.snapshot.queryParams['vnp_BankTranNo'];
    this.vnp_CardType = this.activatedRoute.snapshot.queryParams['vnp_CardType'];
    this.vnp_OrderInfo = this.activatedRoute.snapshot.queryParams['vnp_OrderInfo'];
    this.vnp_PayDate = this.activatedRoute.snapshot.queryParams['vnp_PayDate'];
    this.vnpResponseCode = this.activatedRoute.snapshot.queryParams['vnp_ResponseCode'];
    this.vnp_TransactionNo = this.activatedRoute.snapshot.queryParams['vnp_TransactionNo'];
    this.vnp_TxnRef = this.activatedRoute.snapshot.queryParams['vnp_TxnRef'];
    this.vnp_SecureHash = this.activatedRoute.snapshot.queryParams['vnp_SecureHash'];
  }

}
