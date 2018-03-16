import { Injectable, OnDestroy } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { LoggerSnackbarComponent } from '../entry/logger-snackbar.component';
import { LoggerService } from './logger.service';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { Scheduler } from 'rxjs/Scheduler';
import { Observable } from 'rxjs/Observable';
import { bufferToggle } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { merge } from 'rxjs/observable/merge';
import { mergeAll } from 'rxjs/operators';

@Injectable()
export class LoggerSnackbarService implements OnDestroy {

    private subject = new Subject();
    private pauser$ = new Subject();
    private buffer$ = new Subject();
    private pausableBufferedMessages : Observable<any>;
    private bufferMessages : Observable<any>;

    private snackBarRef: MatSnackBarRef<LoggerSnackbarComponent>;
    private opened = false;


    private message(message: string) {
        this.subject.next(message);
        this.open();
    }

    public open() {

        if (this.opened) return;

        this.opened = true;
        this.snackBarRef = this.snackBar.openFromComponent(LoggerSnackbarComponent);

        this.snackBarRef.afterOpened().subscribe(() => {
            this.pauser$.next(false);
        });
        this.snackBarRef.afterDismissed().subscribe(() => {
            this.opened = false;
            this.pauser$.next(true);
        });
    }

    public close() {

        if (!this.opened) return;

        this.snackBarRef.dismiss();

    }

    constructor(public snackBar: MatSnackBar,
        private _snackBar: LoggerService,
    ) {
        // Buffer messages
        this.bufferMessages = this.subject.bufferToggle(
            this.pauser$.switchMap(paused => {
                return paused ? Observable.of(paused) : Observable.empty();
            }),
            (val) => {
                return this.pauser$.switchMap(paused => {
                    return paused ? Observable.empty() : Observable.of(paused);
                });
            }
        );
        
        this.bufferMessages.subscribe(this.buffer$);

        // Rien ou les messages buffered + la source
        this.pausableBufferedMessages = this.pauser$.switchMap(paused => {
            return paused ? Observable.empty() : merge(this.buffer$.pipe(mergeAll()), this.subject);
        });

        this.pausableBufferedMessages.subscribe(val => {
            this._snackBar.info(val.toString());
        });

        // Start buffer
        this.pauser$.next(true);

        // Subscribe to snackbar pause event
        this._snackBar.pause$.subscribe(val => {
            if (val) {
                this.close();
            }
        });
    }

    public info(message: string) {
        this.message(message);
    }


    ngOnDestroy() {
        this._snackBar.pause$.unsubscribe();

        this.subject.unsubscribe();
        this.pauser$.unsubscribe();
        this.buffer$.unsubscribe();

    }

}