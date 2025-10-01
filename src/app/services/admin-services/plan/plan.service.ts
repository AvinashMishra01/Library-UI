import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
interface Plan {
  name: String,
  price:Number,
  libraryId:String,
  description?:String
}
@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http:HttpClient) { }
  baseUrl:String= environment.apiUrl

savePlan(body:Plan){
  return this.http.post(`${this.baseUrl}/plans`, body)
}

getPlanByLibraryId(libraryId:String)
{
  return this.http.get(`${this.baseUrl}/plans/${libraryId}`)
}

updatePlan(body:any, id:String)
{

  return this.http.put(`${this.baseUrl}/plans/${id}`, body)
}


updatePlanStatus(body:any, Id:String){
  return this.http.put(`${this.baseUrl}/plans/update-status/${Id}`, body)
}

deleteplan(planId:string){
  return this.http.delete(`${this.baseUrl}/plans/${planId}`)
}

}
