import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {User} from '../interfaces/user.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Part} from '../interfaces/part.interface';
import {Avatar} from '../interfaces/avatar.interface';
import {AvatarGet} from '../interfaces/avatarGet.interface';

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
    return this.http.post<Part>(`${this.baseUrl}/login`, login);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<User[]>(`${this.baseUrl}/getAllUsers`);
  }

  getAvatarsByUserId(userId: number): Observable<any> {
    return this.http.get<AvatarGet[]>(`${this.baseUrl}/getAvatarsByUserId?userId=${userId}`);
  }

  saveAvatar(avatar: Avatar): Observable<any> {
    return this.http.post<Avatar>(`${this.baseUrl}/saveAvatar`, avatar);
  }

  getFaces(): Observable<any> {
    return  this.http.get<Part>(`${this.baseUrl}/getFaces`);
  }

  getHats(): Observable<any> {
    return  this.http.get<Part>(`${this.baseUrl}/getHats`);
  }

  getEyes(): Observable<any> {
    return  this.http.get<Part>(`${this.baseUrl}/getEyes`);
  }

  getNose(): Observable<any> {
    return  this.http.get<Part>(`${this.baseUrl}/getNose`);
  }

  getMouths(): Observable<any> {
    return  this.http.get<Part>(`${this.baseUrl}/getMouths`);
  }

  getMustache(): Observable<any> {
    return  this.http.get<Part>(`${this.baseUrl}/getMustaches`);
  }
}
