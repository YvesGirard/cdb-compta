import { select, Store } from '@ngrx/store';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Attendance } from '../../model/member';

import { catchError, finalize, tap } from 'rxjs/operators';

import * as AttendancesActions from '../../core/participant/actions/participant.actions';
import * as AttendanceCollectionActions from '../actions/attendance.collection.actions';
import * as fromAttendances from '../reducers';

export class AttendanceDataSource implements DataSource<Attendance> {

    private attendancesSubject$: Observable<Attendance[]>;

    constructor(private store: Store<fromAttendances.State>) {
        this.attendancesSubject$ = this.store.pipe(select(fromAttendances.getAttendanceCollection),
        );

    }

    connect(collectionViewer: CollectionViewer): Observable<Attendance[]> {
        return this.attendancesSubject$;
    }

    disconnect(collectionViewer: CollectionViewer): void {
        //this.membersSubject$.complete();
    }

    loadAttendances(filter = '', sortOrder = 'asc', sortField = 'name',
    pageNumber = 0, pageSize = 10, searchField = 'name') {
        console.log(pageNumber)
        this.store.dispatch(new AttendanceCollectionActions.Load({
            filter: filter,
            sortOrder: sortOrder,
            sortField: sortField,
            pageNumber: pageNumber,
            pageSize: pageSize,
            searchField: searchField,
        }));
    }

}

