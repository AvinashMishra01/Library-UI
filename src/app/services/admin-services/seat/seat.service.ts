import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeatService {

  constructor(private http: HttpClient,) { }
 baseUrl:string= environment.apiUrl;
addSeat(body:any, roomId:String)
{
   return this.http.post(`${this.baseUrl}/seats/add/${roomId}`, body)
}


}
