// app/models/exercice.js
import * as mongoose from "mongoose";
import {IExercice} from "./iexercice"

interface IExerciceModel extends IExercice, mongoose.Document {}

var ExerciceSchema = new mongoose.Schema({
  fiscal_year: Number,
  begin_dt: Date,
  end_dt: Date,
});

var Exercice = mongoose.model<IExerciceModel>("Exercice", ExerciceSchema);

export = Exercice;    
