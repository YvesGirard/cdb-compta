// app/routes.js
import * as express from "express";
import { IUser } from "../app/model/iuser";
import * as User from "./mongoose/user";
import * as mongoose from "mongoose";
import { IUserModel } from "./mongoose/iuser-model";

var async = require('async');
var _ = require('lodash');

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
        User.find().lean().exec(function (err, users) {

            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.json({ info: 'error finding user', error: err });
            console.log(users)
            res.json(users); // return all users in JSON format
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
                    client_id: process.env.API_CLIENT_ID,
                    client_secret: process.env.API_CLIENT_SECRET,
                    audience: process.env.API_CLIENT_AUDIENCE
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
                requestUpdateUser(data, new User(tmp), body.access_token, () => { });
            });

            function callAPI(option, callback) {
                request(options, function (error, response, body) {
                    if (error) throw new Error(error);
                    console.log("update user");
                    console.log(req.params.id);
                    console.log(body);

                    res.json({ info: 'user updated successfully', data: { response } });
                });
            }

            function requestUpdateUser(user: IUserModel, updatedUser: IUserModel, access_token, callback) {
                console.log("requestUpdateUser");
                console.log(user);
                console.log(updatedUser);

                function filterdeep(object, base, filter) {
                    function changes(object, base, filter) {
                        return _.transform(object, function (result, value, key) {
                            if (!_.isEqual(value, base[key]) && _.has(filter, key)) {
                                result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key], filter[key]) : value;
                            }
                        });
                    }
                    return changes(object, base, filter);
                }
                /*
                                _.mixin({
                                    deeply: function (map) {
                                        return function(obj, fn) {
                                            return map(_.mapValues(obj, function (v) {
                                                return _.isPlainObject(v) ? _.deeply(map)(v, fn) : v;
                                            }), fn);
                                        }
                                    },
                                });*/

                var test = filterdeep(updatedUser, user, {
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
                });

                /*var obj = _.forEach({
                    name: "username",
                }, function (value, key) {
                    var v = _.get(test, key)
                    if (v) {
                        _.unset(test, key);
                        _.set(test, value, v);
                    }
                });*/

                var request = require("request");

                console.log(access_token);

                var options = {
                    method: 'PATCH',
                    url: process.env.AUTH0_URL + '/api/v2/users/' + encodeURI(user.sub),
                    headers: {
                        'authorization': 'Bearer ' + access_token,
                        'content-type': 'application/json'
                    },
                    body: test,
                    json: true
                };

                if (process.env.PROXY) {
                    var HttpsProxyAgent = require('https-proxy-agent');
                    var agent = new HttpsProxyAgent(process.env.PROXY);
                    options["agent"] = agent;
                }

                var asyncTasks = [];

                if (_.has(test, "email")) {
                    //var updateMailBody = {};
                    _.set(test, "verify_email", true);
                    _.set(test, "connection", user.identities[0].connection);
                    _.set(test, "email_verified", false);
                    _.set(test, "client_id", process.env.API_CLIENT_ID);
                    console.log()
                }

                var optionRequest = _.cloneDeep(options);

                _.set(optionRequest, "body", test);


                asyncTasks.push((callback) => {
                    console.log("optionRequest")
                    console.log(optionRequest)
                    request(optionRequest, function (error, response, body) {
                        if (err) { callback(error); }
                        else {
                            console.log("update user 1");
                            console.log(req.params.id);
                            console.log(body);
                            callback(null, { info: 'user updated successfully', data: { response } });
                        }
                    });
                });

                asyncTasks.push((res, callback) => {
                    User.update({
                        _id: user._id
                    }, test, {
                            multi: false
                        }, function (err, result) {
                            if (err) {
                                callback(err);
                            } else {
                                callback(null, { info: 'user updated successfully', data: { result } });
                            }
                        });
                });

                async.waterfall(asyncTasks, function (err, data) {
                    console.log("series")
                    console.log(data)
                    console.log(err)
                    console.log("series end")
                    //  All tasks are done now
                    res.json({ info: 'user updated successfully', data: { data } });
                });




                // /api/v2/users/{id}
                //curl -X PATCH  -H "Content-Type: application/json" -d '{"email":"tit4@coucou.fr"}' https://yvesgirard.eu.auth0.com/api/v2/users/432432432ll

                // Get a token to update user data







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


    app.put('/api/v2/users/:id', function (req, res, next) {
        var tmp = req.body;

        if (!tmp.user_id) {
            res.status(400);
            res.json({
                "error": "Invalid Data"
            });
            return next();
        }

        // Get a token to update user data
        var request = require("request");

        var options = {
            method: 'POST',
            url: process.env.AUTH0_TOKEN_URL,
            headers: { 'content-type': 'application/json' },
            body:
            {
                grant_type: 'client_credentials',
                client_id: process.env.API_CLIENT_ID,
                client_secret: process.env.API_CLIENT_SECRET,
                audience: process.env.API_CLIENT_AUDIENCE
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
            requestUpdateUser(tmp, new User(tmp), body.access_token, () => { });
        });

        function callAPI(option, callback) {
            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                console.log("update user");
                console.log(req.params.id);
                console.log(body);

                res.json({ info: 'user updated successfully', data: { response } });
            });
        }

        function requestUpdateUser(user: IUserModel, updatedUser: IUserModel, access_token, callback) {
            console.log("requestUpdateUser");
            console.log(user);
            console.log(updatedUser);

            const upd_user = _.pick(user, [ "app_metadata",  "user_metadata"]);
            
            if (!_.has(upd_user.app_metadata, "licence_verified")) {
                _.set(upd_user.app_metadata, "licence_verified", false);
            }

            var request = require("request");

            console.log(access_token);

            var options = {
                method: 'PATCH',
                url: process.env.AUTH0_URL + '/api/v2/users/' + encodeURI(user.user_id),
                headers: {
                    'authorization': 'Bearer ' + access_token,
                    'content-type': 'application/json'
                },
                body: upd_user,
                json: true
            };

            if (process.env.PROXY) {
                var HttpsProxyAgent = require('https-proxy-agent');
                var agent = new HttpsProxyAgent(process.env.PROXY);
                options["agent"] = agent;
            }

            var asyncTasks = [];

            var optionRequest = _.cloneDeep(options);

            _.set(optionRequest, "body", upd_user);


            asyncTasks.push((callback) => {
                console.log("optionRequest")
                console.log(optionRequest)
                request(optionRequest, function (error, response, body) {
                    if (error) { callback(error); }
                    else {
                        console.log("update user 1");
                        console.log(req.params.id);
                        console.log(body);
                        callback(null, body);
                    }
                });
            });

            async.waterfall(asyncTasks, function (err, data) {
                console.log("series")
                console.log(data)
                console.log(err)
                console.log("series end")
                //  All tasks are done now
                res.json(data);
            });

        }


    });

    /*
    */



    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)


};


                    //body.access_token
                   // requestUpdateUser(data, tmp, body.access_token, () => { });
/*sendemail
                   var options = {
                    method: 'POST',
                    url: process.env.AUTH0_URL + '/api/v2/jobs/verification-email',
                    headers: { authorization: 'Bearer ' + access_token,
                    'content-type': 'application/json' },
                    body:{"user_id":user.sub},
                    json: true
                    };

                    if (process.env.PROXY) {
                        var HttpsProxyAgent = require('https-proxy-agent');
                        var agent = new HttpsProxyAgent(process.env.PROXY);
                        options["agent"] = agent;
                    }

                    if (!body.email_verified && updUser2["verify_email"]) {
                        request(options, function (error, response, body) {
                            if (error) throw new Error(error);
                            console.log("mail user");
                            console.log(req.params.id);
                            console.log(body);
                        });
                    }
                    */
                    //curl -X POST  -H "Content-Type: application/json" -d '{"user_id":"google-oauth2|1234","client_id":""}' https://yvesgirard.eu.auth0.com/api/v2/jobs/verification-email

