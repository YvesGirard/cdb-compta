export interface Account {
    _id: string;
    number: string;
    descr: string;
    favorite: boolean;
  }
  
  export interface IMail extends IMail, mongoose.Document {
    number: String,
    descr: String,
    favorite: Boolean,
  }