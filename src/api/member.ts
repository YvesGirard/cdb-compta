// app/routes.js
import * as express from "express";
import { IMember } from "../app/model/imember";
import * as Member from "./mongoose/member";
import { forkJoin } from 'rxjs/observable/forkJoin';

const multer = require('multer')
const xlsxtojson = require("xlsx-to-json-lc")
const fs = require('fs');
const _ = require('lodash');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage });

export function members(app: express.Express, authCheck: any, checkScopes: any) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes
    app.use(function (req, res, next) {
        console.log(req.method, req.url);
        next();
    }
    );

    app.post('/api/members/upload', upload.single('uploadFile'), function (req, res, next) {

        if (req.file) {
            console.log('Uploaded: ', req.file)
            //console.log(req.file.buffer);
            //const buf1 = Buffer.from(req.file.buffer);
            //console.log(buf1);
            //fs.readFileSync(buf1)
            xlsxtojson({
                input: req.file.path,
                output: null, //since we don't need output.json
                lowerCaseHeaders: true,
                sheet: "Who's who"
            }, function (err, result) {
                if (err) {
                    return res.json({ error_code: 1, err_desc: err, data: null });
                }

                const map = {
                    nom: "family_name",
                    prénom: "given_name"
                }

                const key = "";

                let col = _(result).filter((o, i) => {
                    return i > 0;
                }).map((row) => {

                    return _(row).mapKeys((value, key) => {
                        key = (result[0][key]).toLowerCase().trim();
                        return map[key] || key;
                    }).mapValues((value, key) => {
                        if (value.charAt(0) == "$")
                            return value.substr(1);
                        else
                            return value;
                    }).value();

                }).value();


                const bulkOps = [];
                _.forEach(col, (row) => {

                    bulkOps.push({
                        updateOne: {
                            filter: { given_name: row.given_name, family_name: row.family_name },
                            update: {
                                name: row.given_name + " " + row.family_name,
                                email: row.email,
                            },
                            upsert: true,
                        }
                    });
                });

                Member.bulkWrite(bulkOps).then((bulkWriteOpResult) => {
                    if (bulkWriteOpResult.ok != 1) {
                        res.json({ info: 'error finding members', error: err });
                    }

                    Member.find().count({}, function (err, count) {

                        // if there is an error retrieving, send the error. 
                        // nothing after res.send(err) will execute
                        if (err) {
                            res.json({ info: 'error finding members', error: err });
                        }


                        Member.find().sort({ 'name': 'asc' }).skip(0).limit(10).exec(function (err, members) {

                            // if there is an error retrieving, send the error. 
                            // nothing after res.send(err) will execute
                            if (err)
                                res.json({ info: 'error finding members', error: err });

                            res.json({ info: 'members found successfully', data: { members: members, count: count } }); // return all users in JSON format
                        });
                    });

                });

            });
        }
    });

    app.get('/api/members/:id', authCheck, checkScopes, function (req, res) {
        var _id = req.params.id;
        Member.findById(_id, function (err, member) {

            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.json({ info: 'error finding members', error: err });

            res.json({ info: 'members found successfully', data: member }); // return all users in JSON format
        });
    });

    // sample api route
    app.get('/api/members', authCheck, checkScopes, function (req, res) {

        var count = req.param("count");

        // use mongoose to get all users in the database
        var filter = req.param("filter");
        var sortOrder = req.param("sortOrder");
        var sortField = req.param("sortField") || 'name';
        var pageSize = Number(req.param("pageSize"));
        var pageSkip = Number(req.param("pageNumber")) * pageSize;

        console.log(sortOrder);
        let regex = {}
        if (filter) {
            //{ sortField: { $regex: /pattern/, $options: '<options>' } }
            _.set(regex, sortField, new RegExp(filter, 'i'));
        }
        let sort = {}
        _.set(sort, sortField, sortOrder);
        console.log(sort);
        console.log(pageSkip);
        console.log(pageSize);
        /*  .set('filter', filter)
          .set('sortOrder', sortOrder)
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString())*/
        if (!count) {
            /*var promise = query.exec();
            assert.ok(promise instanceof Promise);
        
            promise.then(function (doc) {
              // use doc
            });*/


            let query1 = Member.find(regex).sort(sort).skip(pageSkip).limit(pageSize);
            let query2 = Member.find(regex).count();
            /*.exec(function (err, members) {

                // if there is an error retrieving, send the error. 
                // nothing after res.send(err) will execute
                if (err)
                    res.json({ info: 'error finding members', error: err });

                res.json({ info: 'members found successfully', data: members }); // return all users in JSON format
            });*/

            const example = forkJoin(
                query1.exec().then((val) => {return val}),
                query2.exec().then((val) => {return val}),
              );

              const subscribe = example.subscribe(val => {
                res.json({ info: 'members found successfully', data: { members: val[0], count: val[1] } });
              });
        }
        else {
            Member.find().count({}, function (err, count) {

                // if there is an error retrieving, send the error. 
                // nothing after res.send(err) will execute
                if (err)
                    res.json({ info: 'error finding members', error: err });

                res.json({ info: 'members found successfully', data: count }); // return all users in JSON format
            });
        }
    });

    // route create user
    app.post('/api/members', function (req, res, next) {
        var tmp = req.body;

        var tmpmbr = new Member(tmp);
        tmpmbr.save(function (err, result) {
            if (err) {
                res.json({ info: 'error during member create', error: err });
            } else {
                res.json({ info: 'member created successfully', data: result });
            }
        })
    });

    app.put('/api/members/:id', function (req, res, next) {
        var tmp = req.body;

        if (!tmp._id) {
            res.status(400);
            res.json({
                "error": "Invalid Data"
            });
            return next();
        }

        // get the existing product
        Member.findOne({
            _id: tmp._id
        }, function (err, data) {
            // merge req.params/user with the server/user

            var updMember = new Member(); // updated user 
            // logic similar to jQuery.extend(); to merge 2 objects.
            for (var n in data) {
                updMember[n] = data[n];
            }
            for (var n in tmp) {
                updMember[n] = tmp[n];
            }

            Member.update({
                _id: tmp._id
            }, tmp, {
                    multi: false
                }, function (err, result) {
                    if (err) {
                        res.json({ info: 'error during member update', error: err });
                    } else {
                        res.json({ info: 'member updated successfully', data: result });
                    }
                });
        });
    });

    app.delete('/api/members/:id', authCheck, checkScopes, function (req, res) {

        var _id = req.params.id;
        Member.findByIdAndRemove(_id, function (err, member) {

            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.json({ info: 'error finding members', error: err });

            res.json({ info: 'members deleted successfully', data: member }); // return all users in JSON format
        });
    });

    /*
    */



    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)


};
