import { Action } from '@ngrx/store';
import { Attendance } from '../../model/member';

export enum AttendanceActionTypes {
    AddAttendance = '[Attendance] Add',
    AddAttendanceSuccess = '[Attendance] Add Success',
    AddAttendanceFail = '[Attendance] Add Fail',      
    UpdateAttendance = '[Attendance] Update',
    UpdateAttendanceSuccess = '[Attendance] Update Success',
    UpdateAttendanceFail = '[Attendance] Update Fail',   
    UploadAttendance = '[Attendance] UploadAttendance',
    UploadAttendanceSuccess = '[Attendance] UploadAttendance Success',
    UploadAttendanceFail = '[Attendance] UploadAttendance Fail',     
    DeleteAttendance = '[Attendance] Delete',
    DeleteAttendanceSuccess = '[Attendance] Delete Success',
    DeleteAttendanceFail = '[Attendance] Delete Fail',    
    LoadAttendance = '[Attendance] Load',
    LoadAttendanceSuccess = '[Attendance] Load Success',
    LoadAttendanceFail = '[Attendance] Load Fail',
    SelectAttendance = '[Attendance] Select',      
}

export class AddAttendance implements Action {
    readonly type = AttendanceActionTypes.AddAttendance;

    constructor(public payload: Attendance) { }
}

export class AddAttendanceSuccess implements Action {
    readonly type = AttendanceActionTypes.AddAttendanceSuccess;

    constructor(public payload: Attendance) { }
}

export class AddAttendanceFail implements Action {
    readonly type = AttendanceActionTypes.AddAttendanceFail;

    constructor(public payload: any) { }
}

export class UpdateAttendance implements Action {
    readonly type = AttendanceActionTypes.UpdateAttendance;

    constructor(public payload: Attendance) { }
}

export class UpdateAttendanceSuccess implements Action {
    readonly type = AttendanceActionTypes.UpdateAttendanceSuccess;

    constructor(public payload: Attendance) { }
}

export class UpdateAttendanceFail implements Action {
    readonly type = AttendanceActionTypes.UpdateAttendanceFail;

    constructor(public payload: any) { }
}

export class UploadAttendance implements Action {
    readonly type = AttendanceActionTypes.UploadAttendance;

    constructor(public payload: FormData) { }
}

export class UploadAttendanceSuccess implements Action {
    readonly type = AttendanceActionTypes.UploadAttendanceSuccess;

    constructor(public payload: any) { }
}

export class UploadAttendanceFail implements Action {
    readonly type = AttendanceActionTypes.UploadAttendanceFail;

    constructor(public payload: any) { }
}

export class DeleteAttendance implements Action {
    readonly type = AttendanceActionTypes.DeleteAttendance;

    constructor(public payload: Attendance) { }
}

export class DeleteAttendanceSuccess implements Action {
    readonly type = AttendanceActionTypes.DeleteAttendanceSuccess;

    constructor(public payload: Attendance) { }
}

export class DeleteAttendanceFail implements Action {
    readonly type = AttendanceActionTypes.DeleteAttendanceFail;

    constructor(public payload: any) { }
}

export class LoadAttendance implements Action {
    readonly type = AttendanceActionTypes.LoadAttendance;
  
    constructor(public payload: string) {}
  }

  export class LoadAttendanceSuccess implements Action {
    readonly type = AttendanceActionTypes.LoadAttendanceSuccess;

    constructor(public payload: Attendance) { }
}

export class LoadAttendanceFail implements Action {
    readonly type = AttendanceActionTypes.LoadAttendanceFail;

    constructor(public payload: any) { }
}

  export class SelectAttendance implements Action {
    readonly type = AttendanceActionTypes.SelectAttendance;
  
    constructor(public payload: string) {}
  }

export type AttendanceActionsUnion =
    | AddAttendance
    | AddAttendanceSuccess
    | AddAttendanceFail
    | UpdateAttendance
    | UpdateAttendanceSuccess
    | UpdateAttendanceFail
    | DeleteAttendance
    | DeleteAttendanceSuccess
    | DeleteAttendanceFail
    | LoadAttendance
    | LoadAttendanceSuccess
    | LoadAttendanceFail   
    | SelectAttendance;