import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  loginEndpoint = 'rest-auth/login/';

  attemptLogin(username: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}` + this.loginEndpoint, {
      username,
      password
    }, httpOptions);
  }
}
