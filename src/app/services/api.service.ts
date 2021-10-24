import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {User} from '../interfaces/user.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  registerUser(user: User): Observable<any> {
    return this.http.post<User>(`${this.baseUrl}/register`, user);
  }

  login(login: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, login);
  }
}
