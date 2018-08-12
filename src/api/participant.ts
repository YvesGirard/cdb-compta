// app/routes.js
import * as express from "express";
import * as Participant from "./mongoose/participant";
import { forkJoin } from 'rxjs';

const _ = require('lodash');


export function participants(app: express.Express, authCheck: any, checkScopes: any) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes
    app.use(function (req, res, next) {
        console.log(req.method, req.url);
        next();
    }
    );




    // sample api route
    app.get('/api/participants', authCheck, checkScopes, function (req, res) {

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
            query1 = Participant.find(regex).sort(sort).skip(pageSkip).limit(pageSize);
        }
        else {
            query1 = Participant.find(regex).sort(sort);
        }
        const example = forkJoin(
            query1.exec().then((val) => { return val }),
        );

        const subscribe = example.subscribe(val => {
            return res.json(val[0]);
        });

    });

    // route create participant
    app.post('/api/participants', authCheck, checkScopes, function (req, res, next) {

        const _participant = new Participant(_.pick(req.body, [
            "serie",
            "licence",
            "given_name",
            "family_name",
            "gender",
            "birthday",
            "licence_validity.type",
            "licence_validity.saison",
        ]));

        _participant.name =  _participant.given_name + " " + _participant.family_name;

        _participant.save(function (err, result) {
            if (err) {
                return res.status(400).json(err);
            } else {
                return res.json(result);
            }
        })
    });


    app.get('/api/participants/total', authCheck, checkScopes, function (req, res, next) {
        const filter = req.param("filter");
        const searchField = req.param("searchField") || 'name';

        let regex = {}
        if (filter) {
            _.set(regex, searchField, new RegExp(filter, 'i'));
        }

        Participant.find(regex).count({}, function (err, result) {
            if (err) {
                return res.status(400).json(err);
            } else {
                return res.json({ "total": result });
            }
        })

    });

    app.get('/api/participants/:id', authCheck, checkScopes, function (req, res) {
        var _id = req.params.id;
        Participant.findById(_id, function (err, participant) {

            if (err)
                return res.status(400).json(err);

            return res.json(participant); // return all users in JSON format
        });
    });

    app.put('/api/participants/:id', authCheck, checkScopes, function (req, res) {

        console.log(req.body)

        if (!req.body._id) {
            return res.status(400).json({
                "error": "Invalid Data"
            });
        }

        const _participant = _.pick(req.body, [
            "serie",
            "licence",
            "given_name",
            "family_name",
            "gender",
            "birthday",
            "licence_validity.type",
            "licence_validity.saison",
        ]);

        _.set(_participant, "name", _participant.given_name + " " + _participant.family_name);
      

        Participant.findOneAndUpdate({
            _id: req.body._id
        }, _participant,
            { new: true },
            function (err, data) {
                console.log(err)
                if (err) {
                    return res.status(400).json(err);
                } else {
                    return res.json(data);
                }
            });

        // get the existing product
        /*Participant.findOne({
            _id: req.body._id
        }, function (err, data) {
            // merge req.params/user with the server/user

            const _upd = _.merge(data, _participant);

            _upd.update(function (err, result) {
                console.log(err)
                if (err) {
                    return res.status(400).json(err);
                } else {
                    return res.json(result);
                }
            })*/

        /*data.save
        
        Participant.update({
            _id: _upd._id
        }, _upd, {
                multi: false
            }, function (err, result) {
                if (err) {
                    console.log(err)
                    return res.status(400).json(err);
                } else {
                    res.json(result);
                }
            });*/

});

app.delete('/api/participants/:id', authCheck, checkScopes, function (req, res) {

    var _id = req.params.id;
    Participant.findByIdAndRemove(_id, function (err, participant) {

        // if there is an error retrieving, send the error. 
        // nothing after res.send(err) will execute
        if (err)
            return res.status(400).json(err);

        return res.json(participant);
    });
});



};
