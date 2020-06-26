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
    // = "https://localhost:44342/api/Assignment/GetLoggedHoursByAssignment"
    //console.log(selectedAssignmentTime)
    return this.http.post<ReturnBool>("https://localhost:44342/api/AssignmentTime/UpdateAssignmentTime", selectedAssignmentTime)
  }
  
  getSelectedAssignmentTimeEntry():AssignmentTimeEntry{
    return this.selectedAssignmentTime
  }

  deleteAssignmentTime(assignment_time_id:number){
    // = "https://localhost:44342/api/Assignment/GetLoggedHoursByAssignment"
    //console.log(selectedAssignmentTime)
    return this.http.get<AssignmentTimeEntry[]>(`https://localhost:44342/api/AssignmentTime/DeleteAssignmentTime/${assignment_time_id}`)
  }

  getLoggedHoursByAssignment(assignment_id:number) : Observable<AssignmentTimeReturn> {
    return this.http.get<AssignmentTimeReturn>(`https://localhost:44342/api/Assignment/GetLoggedHoursByAssignment/${assignment_id}`)
  }

  addAssignmentTime(assignmentTime:AssignmentTimeEntry){
    console.log("insert")
    console.log(assignmentTime)
    assignmentTime.assignment_time_id = null;
    return this.http.post<ReturnBool>("https://localhost:44342/api/AssignmentTime/AddAssignmentTime", assignmentTime)
  }



}

export class AssignmentTimeEntry{
  assignment_time_id: number
  assignment_id: number
  start_time: Date
  end_time:Date
  description:string
}

export class AssignmentTimeReturn{
  Message:string;
  Code: number;
  Data: [{
    assignment_time_id: number,
    assignment_id: number,
    start_time: Date,
    end_time:Date,
    description:string
  }]
}

export class ReturnBool{
  Message:string;
  Code: number;
}