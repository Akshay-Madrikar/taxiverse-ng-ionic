import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AuthResponseData {
  user: {
    role: number;
    _id: string;
    email: string;
  };
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userIsAuthenticated = false;
  private _userId = null;

  constructor(private http: HttpClient) {}

  get userId() {
    return this._userId;
  }

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  login(email: string, password: string) {
    this._userIsAuthenticated = true;
    return this.http.post<AuthResponseData>(
      'http://localhost:5000/api/signin',
      {
        email: email,
        password: password,
      }
    );
  }

  logout() {
    this._userIsAuthenticated = false;
  }

  signup(email: string, password: string) {
    this._userIsAuthenticated = true;
    return this.http.post<AuthResponseData>(
      'http://localhost:5000/api/signup',
      {
        email: email,
        password: password,
      }
    );
  }
}
