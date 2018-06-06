
  import * as mongoose from "mongoose";
  
  export interface IAccount extends mongoose.Document {
    number: String,
    descr: String,
    favorite: Boolean,
  }