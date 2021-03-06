// app/mailing/models/mail.ts
export interface Mail {
  from: [{
    address: String,
    name: String,
  }],
  to: [{
    address: String,
    name: String,
  }],
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
    related: String,
  }],
}
