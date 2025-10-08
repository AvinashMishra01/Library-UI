import { Injectable } from '@angular/core';
 import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  baseUrl:string= environment.apiUrl



getAllUser(body:any)
{
  let reqParams = new HttpParams()
  .append('limit', body.limit)
  .append('page', body.page)
  .append('userActive', body.userActive)

  return this.http.get(`${this.baseUrl}/users`, {params :reqParams})
}

getUserById(body:number)
{
  this.http.get(`${this.baseUrl}/`)
}

createUser(body:Object)
{
  return this.http.post(`${this.baseUrl}/users/create`, body)

}

}
