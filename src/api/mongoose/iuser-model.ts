// app/models/dancer.js
// grab the mongoose module
import * as mongoose from "mongoose";
import { IUser } from "../../app/model/iuser"

export interface IUserModel extends IUser, mongoose.Document {
  _id: string;
  sub: string;
  identities: [{
    user_id: String;
    connection: String;
  }];
}


