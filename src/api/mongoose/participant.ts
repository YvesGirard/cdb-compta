// app/models/exercice.js
import * as mongoose from "mongoose";

interface IParticipant extends mongoose.Document {
  serie: Number,
  licence: String,  
  given_name: String,    
  family_name: String,  
  name: String,
  gender: String,
  birthday: Date,     
  licence_validity: [{
    type: String,
    saison: String,
  }], 
}

interface IParticipantModel extends IParticipant, mongoose.Document {}

var ParticipantSchema = new mongoose.Schema({
  serie: Number,
  licence: String,  
  given_name: String,    
  family_name: String, 
  name: String, 
  gender: String,
  birthday: Date,     
  licence_validity: [{
    type: String,
    saison: String,
  }], 
});

var Participant = mongoose.model<IParticipantModel>("Participant", ParticipantSchema);

export = Participant;    

