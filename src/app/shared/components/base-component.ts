import { Directive, Injector, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { PaginationRequest } from "../../models/base/pagination-request";
import { ButtonColor, ButtonType, IconButtonType } from "../constants/button.constant";
import { Routing } from "../constants/routing.constant";
import { DeviceType } from "../enumerations/device.enum";
import { ActionExponent } from "../enumerations/permission.enum";
import { SharedService } from "../services/base/shared.service";
import { TrackingService } from "../services/base/tracking.service";
import { Utility } from "../utility/utility";

@Directive()
export class BaseComponent implements OnInit, OnDestroy {

  SharedService = SharedService;

  ButtonType = ButtonType;

  ButtonColor = ButtonColor;

  IconButtonType = IconButtonType;

  ActionExponent = ActionExponent;

  DeviceType = DeviceType;

  Routing = Routing;

  Utility = Utility;

  isLoading: boolean = false;

  paginationRequest = new PaginationRequest();

  moduleKey = '';

  public _onDestroySub: Subject<void> = new Subject<void>();
  public trackingService: TrackingService;
  public sharedService: SharedService;
  public activatedRoute: ActivatedRoute;
  public timerId: any;

  constructor(
    public injector: Injector
  ) { }

  ngOnInit() {
    this.initServices();
    this.initData();
  }

  // unsubscribe khi destroy
  ngOnDestroy() {
    if (this._onDestroySub) {
      this._onDestroySub.next();
      this._onDestroySub.complete();
      this._onDestroySub.unsubscribe();
    }
  }

  initData() {
    return;
  }

  initServices() {
    this.trackingService = this.injector.get(TrackingService);
    this.sharedService = this.injector.get(SharedService);
    this.activatedRoute = this.injector.get(ActivatedRoute);
  }
}
