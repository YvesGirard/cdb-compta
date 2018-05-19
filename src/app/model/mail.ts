import {IMail, IAddress, IAttachement} from "./imail"

export class Attachement implements IAttachement {
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

export class Address implements IAddress {
  address: String;
  name: String; 
}

export class Mail implements IMail { 
  _id: number;
  from: Array<Address>;
  to: Array<Address>;
  subject: String;
  text: String;
  html: String;
  attachments: Array<Attachement>;
  resume: String;

  constructor(_mail= {}) {
    this.resume=(_mail["text"]).substring(0,20) || '';
  }

}
