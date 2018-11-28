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

}
