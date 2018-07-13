import { IService } from './iservice';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { LoggerSnackbarService } from './logger-snackbar.service';

@Injectable()
export class Service implements IService {
  constructor(protected http: Http,
  public snackBarService: LoggerSnackbarService
  ) { 

    
  }
  protected url: string;
  protected headers = new Headers({ 'Content-Type': 'application/json' });
  private _canceled : boolean;
  private _notify : boolean;


  public update(_object: any): Promise<any> {
    const url = `${this.url}/${_object._id}`;

    return this.http
      .put(url, JSON.stringify(_object), { headers: this.headers })
      .toPromise()
      .then(() => {
        console.log('then')
        //if (!this._canceled) this.snackBarService.sendMessage('Sauvegarde effectuée');

        return _object;
        }
      )
      .catch(this.handleError);
  }

  save(_object: any) {
    localStorage.setItem('undo', JSON.stringify(_object))
  }

  rollback(_object: any): Promise<any> {
    this._canceled = true; 
   // this.snackBarService.sendMessage('Annulation en cours...');

    const url = `${this.url}/${_object._id}`;

    return this.http
      .put(url, JSON.stringify(_object), { headers: this.headers })
      .toPromise()
      .then(() => {
       // this.snackBarService.sendMessage('Annulation effectuée...');
        return _object;// = localStorage.getItem('undo')
      })
      .catch(this.handleError);
  }

  protected handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

