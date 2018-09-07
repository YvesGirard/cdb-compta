// app/models/exercice.js
import * as mongoose from "mongoose";

interface IMailingListMember extends mongoose.Document {
  address: String,
  name: String,
  description: String,
  access_level: String,
}

interface IMailingListMemberModel extends IMailingListMember, mongoose.Document {}

var MailingListMemberSchema = new mongoose.Schema({
  address: String,
  name: String,
  subscribed: String,
  upsert: String,
});

var MailingListMember = mongoose.model<IMailingListMemberModel>("MailingList", MailingListMemberSchema);

export = MailingListMember;    
