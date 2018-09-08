// app/routes.js
import * as express from "express";
import * as MailingList from "./mongoose/mailinglist";
import * as MailingListMember from "./mongoose/mailinglistmember";
import * as Member from "./mongoose/member";
import { forkJoin, throwError } from 'rxjs';

const _ = require('lodash');


export function mailinglists(app: express.Express, authCheck: any, checkScopes: any) {

  const api_key = process.env.MAILGUN_API_KEY;
  const DOMAIN = process.env.MAILGUN_DOMAIN;
  //const port = process.env.PORT || 8080;
  const config = { apiKey: api_key, domain: DOMAIN };
  const mailgun = require('mailgun-js')(config);
  const listapi = `https://api:${api_key}@api.mailgun.net/v3/lists`;


  // GET all mailing lists
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

    if (process.env.PROXY) {
      var HttpsProxyAgent = require('https-proxy-agent');
      var agent = new HttpsProxyAgent(process.env.PROXY);
      options["agent"] = agent;
    }

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


  // GET all mailing lists members
  app.get('/api/lists/:id/members', authCheck, checkScopes, function (req, res) {

    console.log("get list members");

    let request = require("request");
    let address = req.params.id;

    let options = {
      method: 'GET',
      url: `${listapi}/${address}/members/pages`,
      headers: { 'content-type': 'application/json' },
      body:
      {
        limit: '100',
      },
      json: true
    };

    if (process.env.PROXY) {
      var HttpsProxyAgent = require('https-proxy-agent');
      var agent = new HttpsProxyAgent(process.env.PROXY);
      options["agent"] = agent;
    }

    request(options, function (error, response, body) {
      console.log(options);
      console.log(body);

      if (error) {
        return res.status(400).json(error);
      } else {
        return res.json(body.items);
      };


    });

  });

  // PUT add mailing lists members
  app.put('/api/lists/:id/members', authCheck, checkScopes, function (req, res) {

    console.log("put list members");

    let request = require("request");
    let address = req.params.id;

    const _member = req.body;
    
    let serverKeyMap = {
      "email": "address"
    };

    console.log(_member);

    Member.find(
      {
        '_id': { $in: _member }
      }, function (err, docs) {

        const _member = _.map(docs, (e) => {
          return _(e).pick(e, ["name", "email"]).assign({ subscribed: true }).mapKeys(
            (value, key) => {
              return serverKeyMap[key] ? serverKeyMap[key] : key;
            }).value()
        });

        requestAddListMembers(_member, (error, response) => {
          if (error) {
            return res.status(400).json(error);
          } else {
            return res.json(response);
          };
        });

      });

    function requestAddListMembers(_member: any[], callback) {

      /** Update mailing list **/
      let options = {
        method: 'POST',
        url: `${listapi}/${address}/members.json`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: `members=${JSON.stringify(_member)}&upsert=yes`,
       // body: `members=[{"name":"test6","address":"bob@example.com","subscribed":false}, {"name":"test022","address":"alice@example.com","subscribed":true}]&upsert=yes`

      };

      console.log("options.body >>>")
      console.log(options.body)

      if (process.env.PROXY) {
        var HttpsProxyAgent = require('https-proxy-agent');
        var agent = new HttpsProxyAgent(process.env.PROXY);
        options["agent"] = agent;
      }

      request(options, function (error, response, body) {
        console.log(options);
        console.log(body);

        if (error) {
          callback(error, null);
        } else {
          callback(null, body.items);
        };

      });
    }


  });

  // DELETE mailing lists members
  app.delete('/api/lists/:id/members', authCheck, checkScopes, function (req, res) {

    console.log("delete list members");

    let request = require("request");
    let address = req.params.id;

    const _member = req.body;

    console.log(_member);

    requestRemoveListMembers(_member, (error, response) => {
      console.log("callback")
      console.log(error)
      console.log(response)
      if (error) {
        return res.status(400).json(error);
      } else {
        return res.json(response);
      };
    });


    function requestRemoveListMembers(_member: string[], callback) {

      /** Update mailing list **/
      let options = {
        method: 'DELETE',
        // url: `${listapi}/${address}/members/${_member}`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      };

      if (process.env.PROXY) {
        var HttpsProxyAgent = require('https-proxy-agent');
        var agent = new HttpsProxyAgent(process.env.PROXY);
        options["agent"] = agent;
      }

      let batch = _.map(_member, (e) => {
        let url = `${listapi}/${address}/members/${e}`;
        let option = { ...options, url: url };

        return request(option, function (error, response, body) {
          console.log(option);
          console.log(body);
          console.log(error);
          if (error) {
            throwError(error);
          } else {
            return body;
          }

        });
      })

      const example = forkJoin(
        batch,
      );

      const subscribe = example.subscribe(
        value => { callback(null, value); },
        err => { callback(err, null); },
      );

    }


  });
};


