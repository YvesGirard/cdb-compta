import { IUser } from "./iuser"

export interface IUserMetaData {
  given_name: string;
  gender: string;
  family_name: string;
  name: string;
  title: boolean;
  email: string;
  birthday: Date;
}

export class UserMetaData implements IUserMetaData {
  given_name: string;
  gender: string;
  family_name: string;
  name: string;
  title: boolean;
  email: string;
  birthday: Date;

  constructor(_metadata= {}) {
    //var _metadata = metadata || {};

    this.given_name=_metadata["given_name"] || '';
    this.gender=_metadata["gender"] || '';
    this.family_name=_metadata["family_name"] || '';
    this.name=_metadata["name"] || '';
    this.title=_metadata["title"] || '';
    this.email=_metadata["email"] || '';
    this.birthday=_metadata["birthday"] || '';
  }

  getUserMetaData() {
    var user_metadata= {};

    Object.assign(user_metadata["user_metadata"], Object.keys(this).filter(
      (key) => {
        return this.hasOwnProperty(key);
      }).reduce((obj, key) => {
        obj[key] = this[key];
        return obj;
      }, {}));

    return user_metadata;
  } 
}

export interface IAppMetaData {
  roles: Array<string>;
}

export class AppMetaData implements IAppMetaData {
  roles: Array<string>;


  constructor(_metadata= {}) {

    this.roles=_metadata["roles"] || [];

  }

  getUserMetaData() {
    var user_metadata= {};

    Object.assign(user_metadata["user_metadata"], Object.keys(this).filter(
      (key) => {
        return this.hasOwnProperty(key);
      }).reduce((obj, key) => {
        obj[key] = this[key];
        return obj;
      }, {}));

    return user_metadata;
  } 
}


export interface Iidentities {
  user_id: string;
  connection: string;
}

export class Identities implements Iidentities {
  user_id: string;
  connection: string;

  constructor(_identities= {}) {

    this.user_id=_identities["user_id"] || '';
    this.connection=_identities["connection"] || '';

  }

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

  constructor(profile: any) {
    
    this._id = profile.sub.split('|')[1];
    this.name = profile.name || '';
    this.email = profile.email || '';
    this.email_verified = profile.email_verified;
    this.family_name = profile.family_name || '';
    this.gender = profile.gender || '';
    this.given_name = profile.given_name || '';
    this.birthday = null;
    this.sub = profile.sub;
    

    profile.user_metadata = Object.assign(new UserMetaData(profile), profile.user_metadata);

    this.user_metadata = new UserMetaData(profile.user_metadata);

    this.app_metadata = new AppMetaData(profile.app_metadata);  
    
    var identities = new Array();

    profile.identities.forEach((element) =>
      identities.push(new Identities(element))
    ); 

    this.identities = identities;
  }

  dbmerge(user: User) {
   // this.title = user.title;
    //this.birthday = user.birthday;
  }

  public isAdmin() : boolean {
      return (this.app_metadata.roles.indexOf("admin")>-1);
  }

  /*setUserMetaData(metadata: any) {
    this.user_meta_data = new UserMetaData(metadata);
  }  */

 
}
