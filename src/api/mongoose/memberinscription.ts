// app/models/exercice.js
import * as mongoose from "mongoose";

interface IMemberInscription extends mongoose.Document {
  member_id: String,
  given_name: String,
  family_name: String,
  email: String,
  id_ac: String,
}

interface IMemberInscriptionModel extends IMemberInscription, mongoose.Document {}

var MemberInscriptionSchema = new mongoose.Schema({
  address: String,
  name: String,
  subscribed: String,
  upsert: String,
});

var MemberInscription = mongoose.model<IMemberInscriptionModel>("MemberInscription", MemberInscriptionSchema);

export = MemberInscription;    
