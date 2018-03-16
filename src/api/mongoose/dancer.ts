// app/models/dancer.js
// grab the mongoose module
import * as mongoose from "mongoose";
import {IHero} from "../../app/model/ihero"

interface IHeroModel extends IHero, mongoose.Document {}

var heroSchema = new mongoose.Schema({
    name: String
});

var Hero = mongoose.model<IHeroModel>("Hero", heroSchema);

export = Hero;    
