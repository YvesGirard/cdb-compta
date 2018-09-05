import {IMember} from "./imember"

export class Member implements IMember { 
  _id: string;
  name: string;
  given_name: string;
  family_name: string;
  email: string;
}
