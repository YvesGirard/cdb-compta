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

export interface IUserMetaData {
  given_name: string;
  gender: string;
  family_name: string;
  name: string;
  title: boolean;
  email: string;
  birthday: Date;
}

export interface Iidentities {
  user_id: string;
  connection: string;
}

export interface IAppMetaData {
  roles: Array<string>;
}

export class UserMetaData implements IUserMetaData {
  given_name: string;
  gender: string;
  family_name: string;
  name: string;
  title: boolean;
  email: string;
  birthday: Date;
}

export class AppMetaData implements IAppMetaData {
  roles: Array<string>;
}

export class Identities implements Iidentities {
  user_id: string;
  connection: string;
}

export class User implements IUser {
  _id: string;
  name: string;
  email: string;
  email_verified: boolean;
  family_name: string;
  gender: string;
  given_name: string;
  birthday: Date;
  sub: string;
  user_metadata: UserMetaData;
  app_metadata: AppMetaData;
  identities: Array<Identities>;

  public isAdmin() : boolean {
      return (this.app_metadata.roles && this.app_metadata.roles.indexOf("admin")>-1);
  }

}
