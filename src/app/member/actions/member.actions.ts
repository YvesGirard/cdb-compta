import { Action } from '@ngrx/store';
import { Member } from '../../model/member';

export enum MemberActionTypes {
    AddMember = '[Member] Add',
    AddMemberSuccess = '[Member] Add Success',
    AddMemberFail = '[Member] Add Fail',      
    UpdateMember = '[Member] Update',
    UpdateMemberSuccess = '[Member] Update Success',
    UpdateMemberFail = '[Member] Update Fail',   
    UploadMember = '[Member] UploadMember',
    UploadMemberSuccess = '[Member] UploadMember Success',
    UploadMemberFail = '[Member] UploadMember Fail',     
    DeleteMember = '[Member] Delete',
    DeleteMemberSuccess = '[Member] Delete Success',
    DeleteMemberFail = '[Member] Delete Fail',    
    LoadMember = '[Member] Load',
    LoadMemberSuccess = '[Member] Load Success',
    LoadMemberFail = '[Member] Load Fail',
    SelectMember = '[Member] Select',    
    GetInscriptions =   '[Member] GetInscriptions',  
    GetInscriptionsSuccess = '[Member] GetInscriptions Success',
    GetInscriptionsFail = '[Member] GetInscriptions Fail',  
}

export class AddMember implements Action {
    readonly type = MemberActionTypes.AddMember;

    constructor(public payload: Member) { }
}

export class AddMemberSuccess implements Action {
    readonly type = MemberActionTypes.AddMemberSuccess;

    constructor(public payload: Member) { }
}

export class AddMemberFail implements Action {
    readonly type = MemberActionTypes.AddMemberFail;

    constructor(public payload: any) { }
}

export class UpdateMember implements Action {
    readonly type = MemberActionTypes.UpdateMember;

    constructor(public payload: Member) { }
}

export class UpdateMemberSuccess implements Action {
    readonly type = MemberActionTypes.UpdateMemberSuccess;

    constructor(public payload: Member) { }
}

export class UpdateMemberFail implements Action {
    readonly type = MemberActionTypes.UpdateMemberFail;

    constructor(public payload: any) { }
}

export class UploadMember implements Action {
    readonly type = MemberActionTypes.UploadMember;

    constructor(public payload: FormData) { }
}

export class UploadMemberSuccess implements Action {
    readonly type = MemberActionTypes.UploadMemberSuccess;

    constructor(public payload: any) { }
}

export class UploadMemberFail implements Action {
    readonly type = MemberActionTypes.UploadMemberFail;

    constructor(public payload: any) { }
}

export class DeleteMember implements Action {
    readonly type = MemberActionTypes.DeleteMember;

    constructor(public payload: Member) { }
}

export class DeleteMemberSuccess implements Action {
    readonly type = MemberActionTypes.DeleteMemberSuccess;

    constructor(public payload: Member) { }
}

export class DeleteMemberFail implements Action {
    readonly type = MemberActionTypes.DeleteMemberFail;

    constructor(public payload: any) { }
}

export class LoadMember implements Action {
    readonly type = MemberActionTypes.LoadMember;
  
    constructor(public payload: string) {}
  }

  export class LoadMemberSuccess implements Action {
    readonly type = MemberActionTypes.LoadMemberSuccess;

    constructor(public payload: Member) { }
}

export class LoadMemberFail implements Action {
    readonly type = MemberActionTypes.LoadMemberFail;

    constructor(public payload: any) { }
}

  export class SelectMember implements Action {
    readonly type = MemberActionTypes.SelectMember;
  
    constructor(public payload: string) {}
  }

  export class GetInscriptions implements Action {
    readonly type = MemberActionTypes.GetInscriptions;
  
    constructor(public payload: Member) {}
  }

  export class GetInscriptionsSuccess implements Action {
    readonly type = MemberActionTypes.GetInscriptionsSuccess;
  
    constructor() {}
  }

  export class GetInscriptionsFail implements Action {
    readonly type = MemberActionTypes.GetInscriptionsFail;
  
    constructor() {}
  }
export type MemberActionsUnion =
    | AddMember
    | AddMemberSuccess
    | AddMemberFail
    | UpdateMember
    | UpdateMemberSuccess
    | UpdateMemberFail
    | DeleteMember
    | DeleteMemberSuccess
    | DeleteMemberFail
    | LoadMember
    | LoadMemberSuccess
    | LoadMemberFail   
    | SelectMember
    | GetInscriptions
    | GetInscriptionsSuccess
    | GetInscriptionsFail;