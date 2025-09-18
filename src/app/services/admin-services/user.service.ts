import { Injectable } from '@angular/core';
 import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  baseUrl:string= environment.apiUrl



getAllUser()
{
  this.http.get(`${this.baseUrl}/users`)
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
