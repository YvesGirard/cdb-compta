import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import { Mail } from '../model/mail';
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import { AuthHttp } from 'angular2-jwt';
import { MailService } from "./mail.service";

@Injectable()
export class MailResolver implements Resolve<Number> {

    constructor(private authHttp: AuthHttp,
        private mailService: MailService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<Number> {
        return this.mailService.count();
    }

}