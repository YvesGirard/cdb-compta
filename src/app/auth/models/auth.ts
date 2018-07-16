import { User } from './user';

export class AuthResult {
    auth:Auth;
    user:User;
  }

  export class Auth {
    token: string;
    id_token: string;
    expires_at: number;
  }
