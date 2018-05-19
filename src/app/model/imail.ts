// app/models/mail.js

export interface IAttachement {
  filename: String,
  contentType: String,
  contentDisposition: String,
  checksum: String,
  size: String,
  headers: String,
  content: String,
  contentId: String,
  cid: String,
  related: String,
}

export interface IAddress {
  address: String,
  name: String,
}

export interface IMail {
  from: Array<IAddress>,
  to: Array<IAddress>,
  subject: String,
  text: String,
  html: String,
  attachments: Array<IAttachement>,
}
