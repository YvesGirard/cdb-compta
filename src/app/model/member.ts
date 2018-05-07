import {IMember} from "./imember"

export class Member implements IMember { 
  _id: number;
  name: string;
  given_name: String;
  family_name: String;
  email: String;
}
