import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }


  //  get assignment time entries for an employee for a specific project
  //  need employee id and project id?
  //  return an observable to then subscribe to by the component
  getAssignmentTimeEntries(employee_id:number) : Observable<AssignmentTimeEntry[]>{
    return this.http.get<AssignmentTimeEntry[]>(`https://localhost:44342/api/Employee/GetAssignmentTimesByEmployee/${employee_id}`)
  }



}

export class AssignmentTimeEntry{
  assignment_id: number
  start_time: Date
  end_time:Date
}
