

export class Participant { 
    _id: string;
    serie: number;
    licence: string;
    given_name: string;
    family_name: string;
    name: string;
    conseil: string;  
    gender: string;
    birthday: Date;
    licence_validity: [{
        type: string;
        saison:string;
    }];
  }