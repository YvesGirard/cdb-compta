// app/routes.js
import * as express from "express";
import * as Account from "./mongoose/account";
import { forkJoin } from 'rxjs/observable/forkJoin';

const _ = require('lodash');


export function members(app: express.Express, authCheck: any, checkScopes: any) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes
    app.use(function (req, res, next) {
        console.log(req.method, req.url);
        next();
    }
    );


    app.get('/api/accounts/:id', authCheck, checkScopes, function (req, res) {
        var _id = req.params.id;
        Account.findById(_id, function (err, account) {

            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.json({ info: 'error finding members', error: err });

            res.json(account); // return all users in JSON format
        });
    });

    // sample api route
    app.get('/api/accounts', authCheck, checkScopes, function (req, res) {

        // use mongoose to get all users in the database
        var filter = req.param("filter");
        var sortOrder = req.param("sortOrder");
        var sortField = req.param("sortField") || 'name';
        var pageSize = Number(req.param("pageSize"));
        var pageSkip = Number(req.param("pageNumber")) * pageSize;

        console.log(sortOrder);
        let regex = {}
        if (filter) {
            _.set(regex, sortField, new RegExp(filter, 'i'));
        }
        let sort = {}
        _.set(sort, sortField, sortOrder);
        console.log(sort);
        console.log(pageSkip);
        console.log(pageSize);



        let query1 = Account.find(regex).sort(sort).skip(pageSkip).limit(pageSize);

        const example = forkJoin(
            query1.exec().then((val) => { return val }),
        );

        const subscribe = example.subscribe(val => {
            res.json(val);
        });

    });

    // route create user
    app.post('/api/accounts', function (req, res, next) {
        var tmp = req.body;

        var tmpmbr = new Account(tmp);
        tmpmbr.save(function (err, result) {
            if (err) {
                res.status(400);
                res.json({
                    "error": err
                });
                return next();
            } else {
                res.json(result);
            }
        })
    });

    app.put('/api/accounts/:id', function (req, res, next) {
        var tmp = req.body;

        if (!tmp._id) {
            res.status(400);
            res.json({
                "error": "Invalid Data"
            });
            return next();
        }

        // get the existing product
        Account.findOne({
            _id: tmp._id
        }, function (err, data) {
            // merge req.params/user with the server/user

            var updAccount = new Account(); // updated user 
            // logic similar to jQuery.extend(); to merge 2 objects.
            for (var n in data) {
                updAccount[n] = data[n];
            }
            for (var n in tmp) {
                updAccount[n] = tmp[n];
            }

            Account.update({
                _id: tmp._id
            }, tmp, {
                    multi: false
                }, function (err, result) {
                    if (err) {
                        res.status(400);
                        res.json({
                            "error": err
                        });
                        return next();
                    } else {
                        res.json(result);
                    }
                });
        });
    });

    app.delete('/api/members/:id', authCheck, checkScopes, function (req, res) {

        var _id = req.params.id;
        Account.findByIdAndRemove(_id, function (err, account) {

            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.json({ info: 'error finding members', error: err });

            res.json(account); // return all users in JSON format
        });
    });



};
