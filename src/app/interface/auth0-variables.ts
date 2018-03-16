
interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
}

export class AUTH_CONFIG implements AuthConfig  {

  public CLIENT_ID : string;
  public CLIENT_DOMAIN: string;
  public AUDIENCE: string;
  public REDIRECT: string;
  public SCOPE: string;
  public SECRET: string;

  constructor(){
    this.CLIENT_ID = 'r2Y8BGhSsDqsHt7uUg1eGGAlTotfRuaC';
    this.CLIENT_DOMAIN= 'yvesgirard.eu.auth0.com';
    this.AUDIENCE= 'https://yvesgirard.eu.auth0.com/api/v2/';
    this.REDIRECT= (typeof document == 'undefined')?'':document.location.origin + '/callback';
    this.SCOPE= 'openid  email profile';
  }

};






