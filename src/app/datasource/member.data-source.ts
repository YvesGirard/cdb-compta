import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject ,  Observable ,  of } from 'rxjs';
import { Member } from "../model/member";
import { MemberService } from "../services/member.service";
import { catchError, finalize } from 'rxjs/operators';

export class MemberDataSource implements DataSource<Member> {

    private membersSubject = new BehaviorSubject<Member[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);

    public count$ = this.countSubject.asObservable();
    public loading$ = this.loadingSubject.asObservable();
    public members$ = this.membersSubject.asObservable();

    constructor(private memberService: MemberService) { }

    connect(collectionViewer: CollectionViewer): Observable<Member[]> {
        return this.membersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.membersSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }

    loadMembers(filter = '',
        sortDirection = 'asc', pageIndex = 0, pageSize = 10) {

        this.loadingSubject.next(true);

        this.memberService.getMembers(filter, sortDirection,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(data => {
                this.membersSubject.next(data['members']);   
                this.countSubject.next(data['count']);
            });
    }

    len(): number {
        //return this.length;
        return 0;
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
                this.countSubject.next((this.countSubject.getValue() as number) + 1);
                this.membersSubject.next(tmp);
            });
    }


    public updateMembers(formData: FormData) {
        return this.memberService.uploadFile(formData).pipe(
            catchError(() => of('')),
            finalize(() => console.log("OK"))
        ).subscribe((data: Object) => {
            this.membersSubject.next(data['members']);   
            this.countSubject.next(data['count']);
        });

    }
}
