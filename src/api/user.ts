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

        // get the existing product
        User.findOne({
            _id: tmp._id
        }, function (err, data) {
            // merge req.params/user with the server/user

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
                });
        });
    });

    /*
    */



    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)


};
