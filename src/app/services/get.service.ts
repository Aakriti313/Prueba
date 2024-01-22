import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  constructor(private http: HttpClient) {}

  getDataContact(): Observable<any> {
    let url = "/server/contact";
    return this.http.get(url); 
  }

  getDataUser(v:string): Observable<any> {
    const url = "/server/user/email/"+v;
    return this.http.get(url);
  }

  getDataAboutUs(): Observable<any> {
    let url = "/server/aboutUs/";
    return this.http.get(url);
  }
}