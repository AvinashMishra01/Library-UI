import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
interface UserSignUpBody {
 name?:String,
  email:String,
  passward:string
}

@Injectable({
  providedIn: 'root'
})

export class UserLoginService {

  constructor(private http:HttpClient ) { }

  baseUrl:string= environment.apiUrl;

userSignUp(body:UserSignUpBody)
{
  return this.http.post(`${this.baseUrl}/auth/user/signup`, body)

}

userLogin(body:UserSignUpBody)
{
  return this.http.post(`${this.baseUrl}/auth//user/login`, body)
}


}
