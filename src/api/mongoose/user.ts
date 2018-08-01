// app/models/dancer.js
// grab the mongoose module
import * as mongoose from "mongoose";
import { IUserModel } from "./iuser-model"

var userSchema = new mongoose.Schema({
  _id: String,
  user_id: String,
  name: String,
  email: { type: String, default: "" },
  email_verified: Boolean,
  birthday: Date,
  sub: String,
  logins_count: Number,
  identities: [{
    user_id: String,
    connection: String,
  }],
  user_metadata: {
    given_name: String,
    gender: String,
    family_name: String,
    name: String,
    title: String,
    birthday: Date,
    email: String,
  }, app_metadata: { 
    licence: String,
    roles: [String] ,
    licence_verified: Boolean,
    user_email_verified: Boolean,}
}, { _id: false });

var User = mongoose.model<IUserModel>("User", userSchema);

export = User;  
