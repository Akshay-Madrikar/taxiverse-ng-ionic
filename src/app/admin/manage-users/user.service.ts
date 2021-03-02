import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';

export interface UserData {
  _id: string;
  email: string;
  role: number;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  public headers: HttpHeaders;
  private authToken = this.authService.getCurrentUserToken();
  private userId = this.authService.userId;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  fetchUsers() {
    return this.http
      .get(`${environment.API_URL}/api/users/all/${this.userId}`, {
        headers: this.headers.append(
          'Authorization',
          `Bearer ${this.authToken}`
        ),
      })
      .pipe(
        map((resData) => {
          return resData;
        })
      );
  }

  blockUser(userId: string, adminId: string) {
    return this.http
      .put(
        `${environment.API_URL}/api/block/user/${userId}/${adminId}`,
        {
          userId,
        },
        {
          headers: this.headers.append(
            'Authorization',
            `Bearer ${this.authToken}`
          ),
        }
      )
      .pipe(map((resData: UserData) => resData));
  }

  UnblockUser(userId: string, adminId: string) {
    return this.http
      .put(
        `${environment.API_URL}/api/unblock/user/${userId}/${adminId}`,
        {
          userId,
        },
        {
          headers: this.headers.append(
            'Authorization',
            `Bearer ${this.authToken}`
          ),
        }
      )
      .pipe(map((resData: UserData) => resData));
  }
}
