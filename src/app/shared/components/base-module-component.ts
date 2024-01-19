import { Directive, Injector } from "@angular/core";
import { LocalStorageKey } from "../constants/localstorage-key.constant";
import { StringHelper } from "../helpers/string.helper";
import { TranslationService } from "../services/translation/translation.service";
import { Utility } from "../utility/utility";
import { BaseComponent } from "./base-component";

@Directive()
export class BaseModuleComponent extends BaseComponent {
  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.moduleKey = this.activatedRoute.snapshot.data['key'];
    if (!StringHelper.isNullOrEmpty(this.moduleKey)) {
      // localStorage.setItem(LocalStorageKey.LAST_ACCESS_MODULE, this.moduleKey);
      setTimeout(() => {
        try {
          Utility.changeTitle(TranslationService.VALUES['ROUTER'][this.moduleKey] || "Microsoft");
        } catch { }
      }, 300);
    }
  }
}
