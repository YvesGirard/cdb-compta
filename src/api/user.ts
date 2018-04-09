// app/routes.js
import * as express from "express";
import { IUser } from "../app/model/iuser";
import * as User from "./mongoose/user";

export function users(app: express.Express, authCheck: any) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes
    app.use(function (req, res, next) {
        console.log(req.method, req.url);
        next();
    }
    );

    // sample api route
    app.get('/api/users', authCheck, function (req, res) {
        // use mongoose to get all users in the database
        User.find(function (err, users) {

            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.json({ info: 'error finding user', error: err });

            res.json({ info: 'users found successfully', data: users }); // return all users in JSON format
        });
    });

    // route create user
    app.post('/api/users', function (req, res, next) {
        var tmp = req.body;

        if (!tmp._id) {
            res.status(400);
            res.json({
                "error": "Invalid Data"
            });
        } else {
            var tmpuser = new User(tmp);
            tmpuser.save(function (err, result) {
                if (err) {
                    res.json({ info: 'error during user create', error: err });
                } else {
                    res.json({ info: 'user created successfully', data: result });
                }
            })
        }
    });

    app.put('/api/users/:id', function (req, res, next) {
        var tmp = req.body;

        if (!tmp._id) {
            res.status(400);
            res.json({
                "error": "Invalid Data"
            });
            return next();
        }

        // get the existing user
        User.findOne({
            _id: tmp._id
        }, function (err, data) {

            // Get a token to update user data
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

            if (process.env.PROXY) {
                var HttpsProxyAgent = require('https-proxy-agent');
                var agent = new HttpsProxyAgent(process.env.PROXY);
                options["agent"] = agent;
            }

            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                console.log("token");
                console.log(req.params.id);
                console.log(body);
                //body.access_token
                requestUpdateUser(data, tmp, body.access_token, () => { });
            });

            function getUpdatedUser(object, source) {


                var test = Object.keys(object).filter(
                    (key) => {
                        if (Object.isExtensible(object[key])) {
                            console.log("isExtensible")
                            console.log(key)
                            object[key] = getUpdatedUser(object[key], source[key]);
                            console.log("end isExtensible")
                            console.log(object[key])
                            return true;
                        }
                        else {
                            console.log("filter") 
                            console.log(key) 
                            console.log(source[key])
                            console.log(object[key]) 
                            return (source[key] != object[key]);
                        }
                    }).reduce((obj, key) => {
                        console.log(" reduce:"+key) 
                        console.log(object[key])
                        console.log(source[key])
                        
                        obj[key] = object[key];
                        
                        return obj;
                    }, {});
                    console.log(" t getUpdatedUser")  
                console.log(test)
               return test;
            }

            function requestUpdateUser(user, updatedUser, access_token, callback) {
                console.log("requestUpdateUser");
                console.log(user);
                console.log(updatedUser);

                var updUser = {
                    name: "",
                    email: "",
                    user_metadata: {
                        given_name: "",
                        gender: "",
                        family_name: "",
                        name: "",
                        title: "",
                        email: "",
                        birthday: ""
                    }
                }
                var test = Object.keys(updUser).filter(
                    (key) => {
                        updUser[key]=updatedUser[key];
                });

                console.log("Object.assign(updUser,updatedUser)");
                console.log(updUser);
                console.log("start getUpdatedUser(updUser,tmp)");
                //console.log(getUpdatedUser(updUser,user));
                console.log("end getUpdatedUser(updUser,tmp)");

                var updUser2 = getUpdatedUser(updUser,user);

                // /api/v2/users/{id}
                //curl -X PATCH  -H "Content-Type: application/json" -d '{"email":"tit4@coucou.fr"}' https://yvesgirard.eu.auth0.com/api/v2/users/432432432ll
                
                // Get a token to update user data
                var request = require("request");

                var options = {
                    method: 'PATCH',
                    url: process.env.AUTH0_URL + '/api/v2/users/'+user._id,
                    headers: { authorization: 'Bearer ' + access_token,
                    'content-type': 'application/json' },
                    body:updUser2,
                    json: true
                };

                if (process.env.PROXY) {
                    var HttpsProxyAgent = require('https-proxy-agent');
                    var agent = new HttpsProxyAgent(process.env.PROXY);
                    options["agent"] = agent;
                }

                request(options, function (error, response, body) {
                    if (error) throw new Error(error);
                    console.log("update user");
                    console.log(req.params.id);
                    console.log(body);
                    //body.access_token
                   // requestUpdateUser(data, tmp, body.access_token, () => { });
                });


                //Can use many more fields
                //var updUser = new User(); // updated user 

                /*
                _id
                name
                email
                email_verified
                birthday
                sub
                user_metadata
                app_metadata*/

            }

            // merge req.params/user with the server/user
            // email changes


/*
            var updUser = new User(); // updated user 
            // logic similar to jQuery.extend(); to merge 2 objects.
            for (var n in data) {
                updUser[n] = data[n];
            }
            for (var n in tmp) {
                updUser[n] = tmp[n];
            }

            User.update({
                _id: tmp._id
            }, tmp, {
                    multi: false
                }, function (err, result) {
                    if (err) {
                        res.json({ info: 'error during user update', error: err });
                    } else {
                        res.json({ info: 'user updated successfully', data: result });
                    }
                });*/

        });
    });

    /*
    */



    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)


};
