import {IMail} from "./imail"

export class Attachement {
  filename: String;
  contentType: String;
  contentDisposition: String;
  checksum: String;
  size: String;
  headers: String;
  content: String;
  contentId: String;
  cid: String;
  related: String;
}

export class Mail implements IMail { 
  _id: number;
  from: String;
  to: String;
  subject: String;
  text: String;
  html: String;
  attachments: [Attachement]
}
