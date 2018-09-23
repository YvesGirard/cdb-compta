import {IMember} from "./imember"

export class Member implements IMember { 
  _id: string;
  name: string;
  given_name: string;
  family_name: string;
  email: string;
}

export class Class { 
  _id: string;
  memberId: string;
  begin_dt: Date;
  end_dt: Date;
  class:string;
}

export class Attendance {
  _id: string;
  memberId: string;
  date: Date;
  class:string;  
}
