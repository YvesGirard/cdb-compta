
  import * as mongoose from "mongoose";
  
  export interface IExercice extends mongoose.Document {
    fiscal_year: Number,
    begin_dt: Date,
    end_dt: Date,
  }
