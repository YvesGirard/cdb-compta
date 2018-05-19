import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Mail } from "../model/mail";
import { MailService } from "../services/mail.service";
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import * as _ from 'lodash';

export class MailDataSource implements DataSource<Mail> {

    private mailsSubject = new BehaviorSubject<Mail[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);

    public count$ = this.countSubject.asObservable();
    public loading$ = this.loadingSubject.asObservable();
    public mails$ = this.mailsSubject.asObservable();

    constructor(private mailService: MailService) { }

    connect(collectionViewer: CollectionViewer): Observable<Mail[]> {
        return this.mailsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.mailsSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }

    loadMails(filter = '',
        sortDirection = 'asc', pageIndex = 0, pageSize = 10) {

        this.loadingSubject.next(true);

        this.mailService.getMails(filter, sortDirection,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(data => {
                this.mailsSubject.next(_.map(data['mails'], (val) => {return new Mail(val)})  as Mail[]);   
                this.countSubject.next(data['count']);
            });
    }


    /*creatMember(member: Member) {

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

    }*/
}
