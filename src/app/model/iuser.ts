export interface IUser {
  _id: string;
  name: string;
  email: string;
  email_verified: boolean;
  family_name: string;
  gender: string;
  given_name: string;
  birthday: Date;
  sub: string;
}
