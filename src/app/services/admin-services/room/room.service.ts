import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  
  constructor(private http: HttpClient) { }

  baseURL= environment.apiUrl;

saveRoom(body:any)
{
  return this.http.post(`${this.baseURL}/rooms/create/${body?.libraryId}`, body)
}



}
