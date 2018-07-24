import { Component, Inject, forwardRef, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatSnackBarRef } from '@angular/material';
import { Subject, Observable, EMPTY, of, merge, interval } from 'rxjs';

import { defaultIfEmpty, delay, concatMap, tap, switchMap } from 'rxjs/operators'
import { setTimeout } from 'timers';

@Injectable()
export class LoggerService {

  public logMessage$ = new Observable<any>();
  public pause$ = new Subject();

  private _message = new Subject<any>();

  private message = new Subject<string>();
  private pendingmessage: string;
  public message$ = this.message.asObservable();
  private opened = false;

  private snackBarTimeOut: any;
  private duration = 2000;


  getMessage(): Observable<string> {
    return this.message$;
  }


  public info(message: string) {
    this._message.next({
      level: "INFO",
      message: message
    });
  }

  sendMessage(_message: string) {

    this.pendingmessage = _message;

    //this.open();
    this.updateMessage();
  }

  updateMessage() {
    if (this.pendingmessage == '') return;
    console.log(this.pendingmessage)
    this.message.next(this.pendingmessage);
    this.pendingmessage = '';

  }

  constructor(public snackBar: MatSnackBar,
  ) {

    const timer$ = new Subject();
    const close$ = new Subject();

    // test
    const omessage = this._message.pipe(
      concatMap(val => {
        return of(val).pipe(
          delay(2000),
          tap(() => {
            this.pause$.next(false);
          })
        )
      }));

      this.logMessage$ = merge(
      omessage,
      this.pause$.pipe(
        switchMap(paused =>
          paused ? EMPTY : interval(3000).pipe(
            tap(() => {
              this.pause$.next(true);
            })
          )
        )
      )
    );
/*
    this.logMessage$ = this._message.pipe(
      concatMap(val => {
        return of(val).pipe(
          delay(2000),
          tap(() => {
            this.pause$.next(false);
          }))
      }),
      merge(
        this.pause$.pipe(
          switchMap(paused =>
            paused ? EMPTY : interval(3000).pipe(
              tap(() => {
                this.pause$.next(true);
              })
            )
          )
        )));
*/


    /* const logMessage$ = this.messageArray.concatMap(val => {
       //return message.merge(Observable.of(val).concat(delay)).finally(() => console.log('Finally')); 
       return Observable.of(val).concat(delay);
     });

     const dismissTimer$ = timer$.switchMap(val => {
       return Observable.interval(3000).mapTo('Fin de séquence');
     });  

     const pausable = pause$.switchMap(paused => paused ? Observable.empty() : dismissTimer$);
     pausable.subscribe(x => {
       pause$.next(true); 
       console.log(x)
     });*/

    /*  this.logMessage$.subscribe(val => {
         console.log(val);
       });*/

    /* pause$.subscribe(val => {
       console.log(val);
     });*/

    /* this.messageArray.next("MESSAGE 1");    
     this.messageArray.next("MESSAGE 2");   
     setTimeout(()=> this.messageArray.next("MMESSAGE 3"),6000); */

  }



}