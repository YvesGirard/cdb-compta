// app/models/exercice.js
import * as mongoose from "mongoose";

interface IMailingList extends mongoose.Document {
  address: String,
  name: String,
  description: String,
  access_level: String,
}

interface IMailingListModel extends IMailingList, mongoose.Document {}

var MailingListSchema = new mongoose.Schema({
  address: String,
  name: String,
  description: String,
  access_level: String,
});

var MailingList = mongoose.model<IMailingListModel>("MailingList", MailingListSchema);

export = MailingList;    
