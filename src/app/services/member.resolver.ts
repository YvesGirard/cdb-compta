import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import { Member } from '../model/member';
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import { AuthHttp } from 'angular2-jwt';
import { map} from 'rxjs/operators';

@Injectable()
export class MembersResolver implements Resolve<Number> {

    constructor(private authHttp: AuthHttp) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<Number> {
        return this.authHttp.get("/api/members/count")
            .pipe(map(res => Number(res.json().data)));
    }

}