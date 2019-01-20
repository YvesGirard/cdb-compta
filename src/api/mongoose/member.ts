// app/models/dancer.js
// grab the mongoose module
import * as mongoose from "mongoose";
import {IMember} from "../../app/model/imember"

interface IMemberModel extends IMember, mongoose.Document {}

var MemberSchema = new mongoose.Schema({
  name: String,
  given_name: String,
  family_name: String,
  email: String,
  id_ac: String,
  rank: String,
  inscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MemberInscription' }],
});
var Member = mongoose.model<IMemberModel>("Member", MemberSchema);

export = Member;    
