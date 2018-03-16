// app/routes.js
import * as express from "express";
import {IHero} from "../app/model/ihero";
import * as Dancer from "./mongoose/dancer";

export function dancers(app:express.Express) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // sample api route
    app.get('/api/dancers', function(req, res) {
        // use mongoose to get all dancers in the database
        Dancer.find(function(err, dancers) {

            // if there is an error retrieving, send the error. 
                            // nothing after res.send(err) will execute
            if (err)
                res.json({info: 'error finding user', error: err});

            res.json({info: 'users found successfully', data: dancers}); // return all dancers in JSON format
        });
    });

    // sample api route
    app.post('/api/dancers', function(req, res, next) {
        var tmp= req.body;
        
        if (!tmp.name) {
            res.status(400);
            res.json({
                "error": "Invalid Data"
            });
        } else {
            var tmpdancer = new Dancer({ name: tmp.name });
            tmpdancer.save(function(err, result) {
                if (err) {
                    res.json({info: 'error during user create', error: err});
                } else {
                    res.json({info: 'user created successfully', data: result});
                }
            })
        }
    });

    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)


};
