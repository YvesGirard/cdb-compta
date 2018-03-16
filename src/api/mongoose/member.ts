// app/models/dancer.js
// grab the mongoose module
import * as mongoose from "mongoose";
import {IMember} from "../../app/model/imember"

interface IMemberModel extends IMember, mongoose.Document {}

var MemberSchema = new mongoose.Schema({
  name: String,
});

var Member = mongoose.model<IMemberModel>("Member", MemberSchema);

export = Member;    
