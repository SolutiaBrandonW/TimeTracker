import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AssignmentTimeService {

  selectedAssignmentTime:AssignmentTimeEntry;

  constructor(private http:HttpClient) { }

  //  get assignment time entries for an employee for a specific project
  //  need employee id and project id?
  //  return an observable to then subscribe to by the component
  getAssignmentTimeEntries(assignment_id:number) : Observable<AssignmentTimeEntry[]>{
    return this.http.get<AssignmentTimeEntry[]>(`https://localhost:44342/api/Assignment/GetLoggedHoursByAssignment/${assignment_id}`)
  }

  setSelectedAssignmentTimeEntry(selectedAssignmentTime:AssignmentTimeEntry){
    console.log("Set Assignment")
    this.selectedAssignmentTime = selectedAssignmentTime
  }
  
  getSelectedAssignmentTimeEntry():AssignmentTimeEntry{
    return this.selectedAssignmentTime
  }

  getLoggedHoursByAssignment(assignment_id:number) : Observable<AssignmentTimeReturn> {
    return this.http.get<AssignmentTimeReturn>(`https://localhost:44342/api/Assignment/GetLoggedHoursByAssignment/${assignment_id}`)
  }


}

export class AssignmentTimeEntry{
  assignment_time_id: number
  assignment_id: number
  start_time: Date
  end_time:Date
}

export class AssignmentTimeReturn{
  Message:string;
  Code: number;
  Data: [{
    assignment_time_id: number,
    assignment_id: number,
    start_time: Date,
    end_time:Date,
  }]
}