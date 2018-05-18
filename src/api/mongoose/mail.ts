// app/models/dancer.js
// grab the mongoose module
import * as mongoose from "mongoose";
import {IMail} from "./imail-model"

interface IMailModel extends IMail, mongoose.Document {}

var MailSchema = new mongoose.Schema({
  from: { address: String, name: String },
  to: { address: String, name: String },
  subject: String,
  text: String,
  html: String,
  attachments: [{
    filename: String,
    contentType: String,
    contentDisposition: String,
    checksum: String,
    size: String,
    headers: String,
    content: String,
    contentId: String,
    cid: String,
    related: String
  }],
});


var Mail = mongoose.model<IMailModel>("Mail", MailSchema);

export = Mail;    
