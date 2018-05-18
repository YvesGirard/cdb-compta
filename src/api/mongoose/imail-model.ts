// app/models/dancer.js
// grab the mongoose module
import * as mongoose from "mongoose";
import { IMail } from "../../app/model/imail"

export interface IMail extends IMail, mongoose.Document {
  from: String,
  to: String,
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
}

