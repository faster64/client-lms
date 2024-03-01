import { Injectable } from "@angular/core";
import { User } from "../../models/user/user";
import { BaseService } from "../base/base.service";
import { HttpService } from "../base/http.service";

@Injectable({
    providedIn: 'root'
})
export class UserClientService extends BaseService {

    public user = new User();

    constructor(
        http: HttpService
    ) {
        super(http);
        this.controller = 'userclient';
    }
}
