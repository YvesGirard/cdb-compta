import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Hero }           from '../model/hero';
import { map } from 'rxjs/operators';

@Injectable()
export class HeroSearchService {
  constructor(private http: Http) {}
  search(term: string): Observable<Hero[]> {
    return this.http
               .get(`app/heroes/?name=${term}`)
               .pipe(
                 map((r: Response) => r.json().data as Hero[]),
               )
  }
}