
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import {
    HttpClient,
    HttpHandler,
    /*RequestOptions,
    RequestOptionsArgs,
    Response,
    Request,
    Headers,
    XHRBackend*/
} from '@angular/common/http';

@Injectable()
export class HttpService extends HttpClient {

    constructor(
        handler: HttpHandler,
    ) { 
        super(handler);
    }

    get(url: string, options?: any): Observable<any> {

        return super.get(this.getFullUrl(url), options)
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .finally(() => {
                this.onEnd();
            });

    }

    private getFullUrl(url: string): string {
        return url;
    }

    private onCatch(error: any, caught: Observable<any>): Observable<any> {
        return observableThrowError(error);
    }

    private onSuccess(res: Response): void {
        console.log('Request successful');
    }

    private onError(res: Response): void {
        console.log('Error, status code: ' + res.status);
    }

    private onEnd(): void {
        // rien
    }

}