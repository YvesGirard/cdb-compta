// app/routes.js
import * as express from "express";
import * as Attendance from "./mongoose/attendance";
import { forkJoin } from 'rxjs';

const _ = require('lodash');


export function attendances(app: express.Express, authCheck: any, checkScopes: any) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes
    app.use(function (req, res, next) {
        console.log(req.method, req.url);
        next();
    }
    );

    // sample api route
    app.get('/api/members/:id/attendances', authCheck, checkScopes, function (req, res) {

        var memberId = req.params.id;

        Attendance.find(
            {
                'memberId': memberId
            }, (err, docs) => {

                if (err) {
                    return res.status(400).json(err);
                } else {
                    return res.json(docs);
                };
            });

    });

    app.post('/api/members/:id/attendances', authCheck, checkScopes, function (req, res, next) {
        var memberId = req.params.id;

        const _attendance = new Attendance(_.pick(req.body, [
            "date",
            "class",
        ]));

        _attendance.memberId = memberId;

        _attendance.save((err, result) => {
            if (err) {
                return res.status(400).json(err);
            } else {
                return res.json(result);
            }
        })
    });

};
