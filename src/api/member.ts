// app/routes.js
import * as express from "express";
import { IMember } from "../app/model/imember";
import * as Member from "./mongoose/member";
import { forkJoin } from 'rxjs';

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
                    if (bulkWriteOpResult['ok'] != 1) {
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



    // sample api route
    app.get('/api/members', authCheck, checkScopes, function (req, res) {

        // use mongoose to get all users in the database
        var filter = req.param("filter");
        var sortOrder = req.param("sortOrder") || 'asc';
        var sortField = req.param("sortField") || 'name';
        var pageSize = Number(req.param("pageSize"));
        var pageSkip = Number(req.param("pageNumber")) * pageSize;
        var searchField = req.param("searchField") || 'name';

        let regex = {}
        if (filter) {
            _.set(regex, searchField, new RegExp(filter, 'i'));
        }
        let sort = {}
        _.set(sort, sortField, sortOrder);

        let query1;

        if (pageSize) {
            query1 = Member.find(regex).sort(sort).skip(pageSkip).limit(pageSize);
        }
        else {
            query1 = Member.find(regex).sort(sort);
        }
        const example = forkJoin(
            query1.exec().then((val) => { return val }),
        );

        const subscribe = example.subscribe(val => {
            return res.json(val[0]);
        });

    });

    // sample api route
    app.get('/api/members/getpagedids', authCheck, checkScopes, function (req, res) {

        // use mongoose to get all users in the database
        var filter = req.param("filter");
        var sortOrder = req.param("sortOrder") || 'asc';
        var sortField = req.param("sortField") || 'name';
        var pageSize = Number(req.param("pageSize"));
        var pageSkip = Number(req.param("pageNumber")) * pageSize;
        var searchField = req.param("searchField") || 'name';

        let regex = {}
        if (filter) {
            _.set(regex, searchField, new RegExp(filter, 'i'));
        }
        let sort = {}
        _.set(sort, sortField, sortOrder);

        let query1;

        query1 = Member.find(regex).sort(sort);

        const example = forkJoin(
            query1.exec().then((val) => { return val }),
        );

        const subscribe = example.subscribe(val => {
            return res.json(val[0]);
        });

    });

    app.get('/api/members/total', authCheck, checkScopes, function (req, res, next) {
        const filter = req.param("filter");
        const searchField = req.param("searchField") || 'name';

        let regex = {}
        if (filter) {
            _.set(regex, searchField, new RegExp(filter, 'i'));
        }

        Member.find(regex).count({}, function (err, result) {
            if (err) {
                return res.status(400).json(err);
            } else {
                return res.json({ "total": result });
            }
        })

    });

    app.get('/api/members/:id', authCheck, checkScopes, function (req, res) {
        var _id = req.params.id;
        Member.findById(_id, function (err, member) {

            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                return res.status(400).json(err);

            return res.json(member); // return all users in JSON format
        });
    });

    // route create user
    app.post('/api/members', authCheck, checkScopes, function (req, res, next) {

        const _member = new Member(_.pick(req.body, [
            "given_name",
            "family_name",
            "email",
        ]));

        _member.name = _member.given_name + " " + _member.family_name;

        _member.save(function (err, result) {
            if (err) {
                return res.status(400).json(err);
            } else {
                return res.json(result);
            }
        })
    });

    app.put('/api/members/:id', authCheck, checkScopes, function (req, res) {

        console.log(req.body)

        if (!req.body._id) {
            return res.status(400).json({
                "error": "Invalid Data"
            });
        }

        const _member = _.pick(req.body, [
            "given_name",
            "family_name",
            "email",
        ]);

        _.set(_member, "name", _member.given_name + " " + _member.family_name);
      

        Member.findOneAndUpdate({
            _id: req.body._id
        }, _member,
            { new: true },
            function (err, data) {
                console.log(err)
                if (err) {
                    return res.status(400).json(err);
                } else {
                    return res.json(data);
                }
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
