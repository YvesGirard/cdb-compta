// app/models/dancer.js
// grab the mongoose module
import * as mongoose from "mongoose";
import {IUser} from "../../app/model/iuser"

interface IUserModel extends IUser, mongoose.Document {
    _id: string;
}

var userSchema = new mongoose.Schema({
  _id: String,
  name: String,
  title: String,
  email: String,
  email_verified: Boolean,
  family_name: String,
  gender: String,
  given_name: String,
  birthday: Date,
  sub: String,
}, { _id: false });

var User = mongoose.model<IUserModel>("User", userSchema);

export = User;    
