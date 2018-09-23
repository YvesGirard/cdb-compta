// app/models/exercice.js
import * as mongoose from "mongoose";

interface IAttendance extends mongoose.Document {
  memberId: String;
  date: Date;
  class: String;
}

interface IAttendanceModel extends IAttendance, mongoose.Document {}

var AttendanceSchema = new mongoose.Schema({
  memberId: String,
  date: Date,
  class: String,  
});

var Attendance = mongoose.model<IAttendanceModel>("MailingList", AttendanceSchema);

export = Attendance;    
