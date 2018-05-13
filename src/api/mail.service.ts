// app/routes.js
import * as express from "express";
import * as mailgun from "mailgun-js";
import * as crypto from 'crypto';

export function mails(app: express.Express, authCheck: any, authScopes: any) {
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

  var jwt = require('express-jwt');
  var jwksRsa = require('jwks-rsa');
  const jwtAuthz = require('express-jwt-authz');

  var checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://yvesgirard.eu.auth0.com/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: 'https://cdbmail.com/api/v2/',
    issuer: `https://yvesgirard.eu.auth0.com/`,
    algorithms: ['RS256']
  });

  var checkScopes = jwtAuthz(['send:verification']);

  app.post('/api/mails/verification', checkJwt, checkScopes, function (req, res) {

    // curl -X POST  -H "Content-Type: application/json" -d '{"user_id":"google-oauth2|1234","client_id":""}' https://yvesgirard.eu.auth0.com/api/v2/jobs/verification-email

    var _id = req.params.id;
    console.log(req);

    var api_key = process.env.MAILGUN_API_KEY;
    var DOMAIN = process.env.MAILGUN_DOMAIN;
    var port = process.env.PORT || 8080;
    var config = { apiKey: api_key, domain: DOMAIN };

    if (process.env.PROXY)
      config["proxy"] = "http://127.0.0.1:3128";


    var mailgun = require('mailgun-js')(config);

    var data = {
      from: 'Excited User <yv.girard@gmail.com>',
      to: 'yv.girard@gmail.com',
      subject: 'Hello',
      text: 'Testing some Mailgun awesomness!'
    };

    mailgun.messages().send(data, function (error, body) {
      console.log(error || body);
    });


    res.json({ info: 'error finding members', data: "Hello" });
  });

  app.post('/api/mails/v2/verification', function (req, res) {

    // curl -X POST  -H "Content-Type: application/json" -d '{"user_id":"google-oauth2|1234","client_id":""}' https://yvesgirard.eu.auth0.com/api/v2/jobs/verification-email

    var _id = req.params.id;
    console.log(req);

    var api_key = process.env.MAILGUN_API_KEY;
    var DOMAIN = process.env.MAILGUN_DOMAIN;
    var port = process.env.PORT || 8080;
    var config = { apiKey: api_key, domain: DOMAIN };

    if (process.env.PROXY)
      config["proxy"] = "http://127.0.0.1:3128";


    var mailgun = require('mailgun-js')(config);

    var data = {
      from: 'secretariat@carnetdebals.com',
      to: 'conseil@carnetdebals.com',
      subject: 'Hello',
      text: 'Testing some Mailgun awesomness!'
    };

    mailgun.messages().send(data, function (error, body) {
      console.log(error || body);
    });


    res.json({ info: 'error finding members', data: "Hello" });
  });

  app.post('/api/mails/v2/store', function (req, res) {
    let message = req.body;
    console.log(req);
    console.log(message);
    let data = message.timestamp + message.token;
    let signaturecdb = crypto.createHmac("sha256", process.env.MG_API_KEY_STORE).update(data).digest("hex");

    if (signaturecdb != message.signature)
      return res.end();

    let decodedMessage = {
      from: message.From,
      to: message.To,
      subject: message.Subject,
      text: 'Testing some Mailgun awesomness!'
    }


    res.json({ info: 'error finding members', data: "Hello" });
  });

  app.post('/api/mails/v2/store/mime', function (req, res) {
    let message = req.body;
    console.log("req")
    console.log(req);
    console.log("body")
    console.log(message);
    console.log("end body")
    let token = message.timestamp + message.token;
    let signaturecdb = crypto.createHmac("sha256", process.env.MG_API_KEY_STORE).update(token).digest("hex");

    if (signaturecdb != message.signature)
      return res.end();

  /*  let decodedMessage = {
      from: message.From,
      to: message.To,
      subject: message.Subject,
      text: 'Testing some Mailgun awesomness!'
    }*/

    var api_key = process.env.MAILGUN_API_KEY;
    var DOMAIN = process.env.MAILGUN_DOMAIN;
    var port = process.env.PORT || 8080;
    var config = { apiKey: api_key, domain: DOMAIN };

    if (process.env.PROXY)
      config["proxy"] = "http://127.0.0.1:3128";


    var mailgun = require('mailgun-js')(config);

    var data = {
      from: 'Excited User <yv.girard@gmail.com>',
      to: 'yv.girard@gmail.com',
      subject: message["Subject"],
      message: message['body-mime']
    };

    mailgun.messages().send(data, function (error, body) {
      console.log(error || body);
    });


    res.json({ info: 'error finding members', data: "Hello" });
  });

  app.post('/api/v2/mails/verification/:id', authCheck, function (req, res) {

    // curl -X POST  -H "Content-Type: application/json" -d '{"user_id":"google-oauth2|1234","client_id":""}' https://yvesgirard.eu.auth0.com/api/v2/jobs/verification-email

    var request = require("request");

    var options = {
      method: 'POST',
      url: process.env.AUTH0_TOKEN_URL,
      headers: { 'content-type': 'application/json' },
      body:
        {
          grant_type: 'client_credentials',
          client_id: process.env.MAIL_CLIENT_ID,
          client_secret: process.env.MAIL_CLIENT_SECRET,
          audience: process.env.MAIL_CLIENT_AUDIENCE
        },
      json: true
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(req.params.id);
      console.log(body);
    });

  });
};



