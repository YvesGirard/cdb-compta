// app/routes.js
import * as express from "express";
import * as Exercice from "./mongoose/exercice";
import { forkJoin } from 'rxjs';

import * as _ from 'lodash';


export function exercices(app: express.Express, authCheck: any, checkScopes: any) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes
    app.use(function (req, res, next) {
        console.log(req.method, req.url);
        next();
    }
    );


    app.get('/api/exercices/:id', authCheck, checkScopes, function (req, res) {
        var _id = req.params.id;
        Exercice.findById(_id, function (err, exercice) {

            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.json({ info: 'error finding members', error: err });

            res.json(exercice); // return all users in JSON format
        });
    });

    // sample api route
    app.get('/api/exercices', authCheck, checkScopes, function (req, res) {

        // use mongoose to get all users in the database
        var filter = req.param("filter");
        var sortOrder = req.param("sortOrder") || 'asc';
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

        let query1;

        if (pageSize) {
            query1 = Exercice.find(regex).sort(sort).skip(pageSkip).limit(pageSize);
        }
        else {
            query1 = Exercice.find(regex).sort(sort);
        }
        const example = forkJoin(
            query1.exec().then((val) => { return val }),
        );

        const subscribe = example.subscribe(val => {
            res.json(val[0]);
        });

    });

    // route create user
    app.post('/api/exercices', function (req, res, next) {
        var tmp = req.body;

        var tmpmbr = new Exercice(tmp);
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

    app.put('/api/exercices/:id', function (req, res, next) {
        var tmp = req.body;

        if (!tmp._id) {
            res.status(400);
            res.json({
                "error": "Invalid Data"
            });
            return next();
        }

        // get the existing product
        Exercice.findOne({
            _id: tmp._id
        }, function (err, data) {
            // merge req.params/user with the server/user

            var updExercice = new Exercice(); // updated user 
            // logic similar to jQuery.extend(); to merge 2 objects.
            for (var n in data) {
                updExercice[n] = data[n];
            }
            for (var n in tmp) {
                updExercice[n] = tmp[n];
            }

            Exercice.update({
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
        Exercice.findByIdAndRemove(_id, function (err, exercice) {

            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.json({ info: 'error finding members', error: err });

            res.json(exercice); // return all users in JSON format
        });
    });



};
