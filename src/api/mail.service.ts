// app/routes.js
import * as express from "express";
import * as mailgun from "mailgun-js";

export function mails(app: express.Express, authCheck: any, checkScopes: any) {
// test : curl -d "param1=value1&param2=value2" -X POST http://localhost:8080/api/mails/verification
// test : curl -d "param1=value1&param2=value2" -X POST https://cdb-eugenie.herokuapp.com/api/mails/verification

  // server routes ===========================================================
  // handle things like api calls
  // authentication routes
  app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
  }
  );

  app.post('/api/mails/verification', function (req, res) {
    var _id = req.params.id;
    console.log(req);
    console.log(process.env.api_key)
    console.log(process.env.DOMAIN)

    var api_key = process.env.api_key;
    var DOMAIN = process.env.DOMAIN;
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});
    
    var data = {
      from: 'Excited User <me@samples.mailgun.org>',
      to: 'yv.girard@gmail.com',
      subject: 'Hello',
      text: 'Testing some Mailgun awesomness!'
    };
    
    mailgun.messages().send(data, function (error, body) {
      console.log(error || body);
    });
    

    res.json({ info: 'error finding members', data: "Hello" });
  });
};
