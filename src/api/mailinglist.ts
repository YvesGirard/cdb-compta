// app/routes.js
import * as express from "express";
import * as MailingList from "./mongoose/mailinglist";
import { forkJoin, throwError } from 'rxjs';

const _ = require('lodash');


export function mailinglists(app: express.Express, authCheck: any, checkScopes: any) {

  const api_key = process.env.MAILGUN_API_KEY;
  const DOMAIN = process.env.MAILGUN_DOMAIN;
  //const port = process.env.PORT || 8080;
  const config = { apiKey: api_key, domain: DOMAIN };
  const mailgun = require('mailgun-js')(config);
  const listapi = `https://api:${api_key}@api.mailgun.net/v3/lists`;


  // sample api route
  app.get('/api/lists', authCheck, checkScopes, function (req, res) {

    console.log("get list");

    let request = require("request");

    let options = {
      method: 'GET',
      url: `${listapi}/pages`,
      headers: { 'content-type': 'application/json' },
      body:
      {
        limit: '100',
      },
      json: true
    };

    request(options, function (error, response, body) {
      console.log(options);
      console.log(body);


      if (error) {
        return res.status(400).json(error);
      } else {
        let queries = [];
        let _address = [];
        let observableBatch = [];

        _(body.items).forEach((item) => {

          let _mailinglist = _.pick(item, [
            "address",
            "name",
            "description",
            "access_level",
          ]);

          observableBatch.push(
            MailingList.findOneAndUpdate({
              address: item.address
            }, _mailinglist,
              {
                new: true,
                upsert: true
              },
              (err, data) => {
                if (err) {
                  throwError(err);
                } else {
                  return data;
                }
              }).exec()
          )
        })

        let fork = forkJoin(observableBatch).subscribe(
          value => { return res.json(value); },
          err => { console.log(err) },
        );



      };


    });




  });

};
