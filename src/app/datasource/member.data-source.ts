import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Member } from "../model/member";
import { MemberService } from "../services/member.service";
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

export class MemberDataSource implements DataSource<Member> {

    private membersSubject = new BehaviorSubject<Member[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private memberService: MemberService) { }

    connect(collectionViewer: CollectionViewer): Observable<Member[]> {
        return this.membersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.membersSubject.complete();
        this.loadingSubject.complete();
    }

    loadMembers(filter = '',
        sortDirection = 'asc', pageIndex = 0, pageSize = 3) {

        this.loadingSubject.next(true);

        this.memberService.getMembers(filter, sortDirection,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(members => {
                console.log(members)
                this.membersSubject.next(members)
            });
    }

    creatMember(member: Member) {

        this.loadingSubject.next(true);

        this.memberService.create(member).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe(members => {
                var tmp = this.membersSubject.getValue();
                tmp.push(members as Member);
                this.membersSubject.next(tmp);
            });
    }
}
