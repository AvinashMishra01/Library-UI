import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient, ) { }
 baseUrl= environment.apiUrl

 savePayment(body:any)
 {
  console.log(body);

  return this.http.post(`${this.baseUrl}/payment/update-plan`, body)
 }

}
