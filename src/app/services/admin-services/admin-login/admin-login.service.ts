import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 import { environment } from '../../../../environments/environment';
interface AdminSignUpBody {
  name:String,
  email:String,
  passward:string
}
@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  constructor(private http:HttpClient,) { }
  baseUrl:string= environment.apiUrl;

 adminSignup(body:AdminSignUpBody)
{
  console.log('body is ', body)
   return  this.http.post(`${this.baseUrl}/auth/admin/signup`, body)
}

adminLogin(body:{email:String, password:String})
{
  return this.http.post(`${this.baseUrl}/auth/admin/login`,body);
}

}
