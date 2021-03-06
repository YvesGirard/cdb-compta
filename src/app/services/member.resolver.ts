import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import { Member } from '../model/member';
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import { map} from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { MemberService } from "./member.service";

@Injectable()
export class MembersResolver implements Resolve<Number> {

    constructor(
        private memberService: MemberService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<Number> {
        return this.memberService.count();
    }

}