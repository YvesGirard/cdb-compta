import {IMail, IAddress, IAttachement} from "./imail"
import * as _ from 'lodash';

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
    this._id= _mail["_id"] || '';
    this.from= _mail["from"]? _.map(_mail["from"], (val) => {return val as Address}):[];
    this.to= _mail["to"]? _.map(_mail["to"], (val) => {return val as Address}):[];
    this.subject= _mail["subject"] || '';
    this.text= _mail["text"] || '';
    this.html= _mail["html"] || '';
    this.attachments= _mail["attachments"]? _.map(_mail["attachments"], (val) => {return val as Attachement}):[];
    this.resume=(_mail["text"]).substring(0,20) || '';
  }

}
