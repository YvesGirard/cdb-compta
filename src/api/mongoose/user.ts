// app/models/dancer.js
// grab the mongoose module
import * as mongoose from "mongoose";
import { IUser } from "../../app/model/iuser"

interface IUserModel extends IUser, mongoose.Document {
  _id: string;
}

var userSchema = new mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  email_verified: Boolean,
  birthday: Date,
  sub: String,
  logins_count:Number,
  user_metadata: {
    given_name: String,
    gender: String,
    family_name: String,
    name: String,
    title: String,
    email: String,
    birthday: String
  },app_metadata: { roles: [String] },
}, { _id: false });

var User = mongoose.model<IUserModel>("User", userSchema);

export = User;  
