import { Injectable } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
import { LoaderService } from '../../loader/loader.service';


import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loader: LoaderService) {}
 
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.loader.show();
 
    // extend server response observable with logging
    return next.handle(req)
      .pipe(
        finalize(() => {
          this.loader.hide();
        })
      );
  }
}