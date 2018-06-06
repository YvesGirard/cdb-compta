// app/models/account.js
import * as mongoose from "mongoose";
import {IAccount} from "./iaccount"

interface IAccountModel extends IAccount, mongoose.Document {}

var AccountSchema = new mongoose.Schema({
  number: String,
  descr: String,
  favorite: Boolean,
});

var Account = mongoose.model<IAccountModel>("Account", AccountSchema);

export = Account;    
