

export class Participant { 
    _id: string;
    serie: number;
    licence: string;
    given_name: string;
    family_name: string;
    gender: string;
    licence_validity: [{
        type: string;
        saison:string;
    }];
  }