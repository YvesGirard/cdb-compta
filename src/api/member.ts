// app/routes.js
import * as express from "express";
import { IMember } from "../app/model/imember";
import * as Member from "./mongoose/member";

export function members(app: express.Express, authCheck: any, checkScopes: any) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes
    app.use(function (req, res, next) {
        console.log(req.method, req.url);
        next();
    }
    );


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
        // use mongoose to get all users in the database
        var sortOrder = req.param("sortOrder");
        var sortField = req.param("sortField") || 'name';
        var pageSize = Number(req.param("pageSize"));
        var pageSkip = Number(req.param("pageNumber")) * pageSize;

        console.log(sortOrder);
        /*  .set('filter', filter)
          .set('sortOrder', sortOrder)
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString())*/

        Member.find().sort({ sortField: sortOrder }).skip(pageSkip).limit(pageSize).exec(function (err, members) {

            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.json({ info: 'error finding members', error: err });

            res.json({ info: 'members found successfully', data: members }); // return all users in JSON format
        });
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
