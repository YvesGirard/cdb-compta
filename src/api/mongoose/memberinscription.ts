// app/models/exercice.js
import * as mongoose from "mongoose";

interface IMemberInscription extends mongoose.Document {
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
  payment: String,
  amount: Number,
  method: String,
  product: String,
  price_type: String,
  date: Date,
  id_ac: String,
}

interface IMemberInscriptionModel extends IMemberInscription, mongoose.Document {}

var MemberInscriptionSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
  payment: String,
  amount: Number,
  method: String,
  product: String,
  price_type: String,
  date: Date,
  id_ac: String,  
});

var MemberInscription = mongoose.model<IMemberInscriptionModel>("MemberInscription", MemberInscriptionSchema);

export = MemberInscription;    
