import { IMail, IAddress, IAttachement } from "./imail"
import * as _ from 'lodash';

export class MailingListMember {
  _id: string;  
  address: string;
  name: string;
  vars: string;
  subscribed: string;
  mailinglistid: string;
}

export class MailingList {
  _id: string;
  address: string;
  name: string;
  description: string;
  access_level: string;
}

export class Attachement implements IAttachement {
  filename: string;
  contentType: string;
  contentDisposition: string;
  checksum: string;
  size: string;
  headers: string;
  content: string;
  contentId: string;
  cid: string;
  related: string;
}

export class Address implements IAddress {
  address: string;
  name: string;
}

export class Mail implements IMail {
  _id: string;
  from: Array<Address>;
  to: Array<Address>;
  subject: string;
  text: string;
  html: string;
  attachments: Array<Attachement>;
  resume: string;

  constructor(_mail = {}) {
    this._id = _mail["_id"] || '';
    this.from = _mail["from"] ? _.map(_mail["from"], (val) => { return val as Address }) : [];
    this.to = _mail["to"] ? _.map(_mail["to"], (val) => { return val as Address }) : [];
    this.subject = _mail["subject"] || '';
    this.text = _mail["text"] || '';
    this.html = _mail["html"] || '';
    //this.attachments= _mail["attachments"]? _.map(_mail["attachments"], (val) => {return val as Attachement}):[];
    this.attachments = [];
    this.resume = (_mail["text"] ? _mail["text"] : '').substring(0, 20);
  }

}
