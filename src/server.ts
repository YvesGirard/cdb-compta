import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { AUTH_CONFIG } from './app/interface/auth0-variables';

import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';

import * as mongoose from "mongoose";


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

var jwt = require('express-jwt');
var jwksRsa = require('jwks-rsa');
const jwtAuthz = require('express-jwt-authz');

// Authentication middleware provided by express-jwt.
// This middleware will check incoming requests for a valid
// JWT on any routes that it is applied to.
var auth = new AUTH_CONFIG();

console.log("ENV TOKEN :" + process.env.ITOKEN);

console.log("auth secret :" + auth.SECRET);

/*var authCheck = jwt({
    secret: auth.SECRET,
    audience: auth.CLIENT_ID,
    issuer: 'https://yvesgirard.eu.auth0.com/',
    algorithms: ['HS256'],
  });*/
var checkJwt = (req, res, next) => {
  next();
};

var checkScopes = (req, res, next) => {
  next();
};

if (!process.env.ITOKEN) {
  checkJwt = jwt({
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
    audience: auth.AUDIENCE,
    issuer: `https://yvesgirard.eu.auth0.com/`,
    algorithms: ['RS256']
  });

  checkScopes = jwtAuthz(['read:member']);
}



// Faster server renders w/ Prod mode (dev mode never needed)
//enableProdMode();

// modules =================================================

const app = express();
//app.use(morgan('combined'))
//const { auth0 } = require('auth0-js');

var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================

// config files
//var db = require('./config/db');

// set our port
var port = process.env.PORT || 8080;

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
console.log(process.env.MONGODB_URI || process.env.DB_URL)
mongoose.connect(process.env.MONGODB_URI || process.env.DB_URL);

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/'));

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// routes ==================================================
import * as dancer from "./api/dancer";
dancer.dancers(app);

import * as user from "./api/user";
user.users(app, checkJwt);

import * as member from "./api/member";
member.members(app, checkJwt, checkScopes);

import * as mails from "./api/mail.service";
mails.mails(app, checkJwt, checkScopes);

console.log(__dirname)

// frontend routes =========================================================
// route to handle all angular requests
app.get('*', function (req, res) {
  res.sendFile('index.html', { "root": __dirname }); // load our public/index.html file
});



// shoutout to the user                     
console.log('Server running at ' + port);

// expose app           
exports = module.exports = app;                         
