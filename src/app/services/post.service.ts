import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../clases/users';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}

  postUserSignUp(user:User):Observable<any> {
    let url = "/server/user/register";
    return this.http.post(url, user, 
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  postUserLogIn(user:User):Observable<any> {
    let url = "/server/user/login";
    return this.http.post(url, user, 
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  //Editar usuario actual
  updateUser(userData: any): Observable<any> {
    const nickname = userData.nickname_user;
    let url = "/server/user/edit/"+nickname;
    return this.http.put(url, userData,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  deleteUser(nickname: string): Observable<any> {
    let url = "/server/user/delete/"+nickname;
    return this.http.delete(url, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }
  
}
