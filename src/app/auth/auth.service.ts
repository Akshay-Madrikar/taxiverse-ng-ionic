import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

export interface UserData {
  token: String;
  user: Object;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userIsAuthenticated = true;
  private _userId = null;
  public headers: HttpHeaders;
  private user: any;
  private authToken: any;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  get userId() {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      return user._id;
    } else {
      return false;
    }
  }

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  getCurrentUserToken() {
    if (typeof window === 'undefined') {
      return false;
    }

    if (localStorage.getItem('token')) {
      return JSON.parse(localStorage.getItem('token'));
    } else {
      return false;
    }
  }

  getProfile() {
    //this.loadToken();
    this.headers.append('Authorization', `Bearer ${this.authToken}`);
    this.headers.append('Content-Type', 'application/json');
    return this.http
      .get('/user', { headers: this.headers })
      .pipe(map((res) => res));
  }

  login(user) {
    this._userIsAuthenticated = true;
    return this.http
      .post(
        'http://localhost:5000/api/signin',
        {
          user,
        },
        {
          headers: this.headers,
        }
      )
      .pipe(map((res) => res));
  }

  storeUserData(token, user) {
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  // loadToken() {
  //   const token = localStorage.getItem('token');
  //   this.authToken = token;
  //   return token;
  // }

  logout() {
    this._userIsAuthenticated = false;
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  signup(user) {
    this._userIsAuthenticated = true;
    return this.http
      .post(
        'http://localhost:5000/api/signup',
        {
          user,
        },
        {
          headers: this.headers,
        }
      )
      .pipe(map((res) => res));
  }
}
