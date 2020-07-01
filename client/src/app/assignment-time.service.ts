import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { APIReturn, APIMetaReturn } from '../app/api.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentTimeService {

  selectedAssignmentTime:AssignmentTime;

  constructor(private http:HttpClient) { }

  setSelectedAssignmentTimeEntry(selectedAssignmentTime:AssignmentTime){
    return this.http.post<APIMetaReturn>("https://localhost:44342/api/AssignmentTime/UpdateAssignmentTime", selectedAssignmentTime);
  }
  
  getSelectedAssignmentTimeEntry():AssignmentTime {
    return this.selectedAssignmentTime;
  }

  deleteAssignmentTime(assignment_time_id:number){
    return this.http.get<APIReturn<AssignmentTime[]>>(`https://localhost:44342/api/AssignmentTime/DeleteAssignmentTime/${assignment_time_id}`)
  }

  getLoggedHoursByAssignment(assignment_id:number) : Observable<APIReturn<AssignmentTime[]>> {
    return this.http.get<APIReturn<AssignmentTime[]>>(`https://localhost:44342/api/Assignment/GetLoggedHoursByAssignment/${assignment_id}`)
  }

  addAssignmentTime(assignmentTime:AssignmentTime){
    console.log("insert")
    console.log(assignmentTime)
    assignmentTime.assignment_time_id = null;
    return this.http.post<APIMetaReturn>("https://localhost:44342/api/AssignmentTime/AddAssignmentTime", assignmentTime)
  }

  getAllAssignmentTimeByProject(project_id:number){
    return this.http.get<APIReturn<ProjectAssignmentTime[]>>(`https://localhost:44342/api/Project/GetAllAssignmentTimesByProject/${project_id}`)
  }
}

export class AssignmentTime {
  assignment_time_id: number
  assignment_id: number
  start_time: Date
  end_time:Date
  description:string
}
 
export class ProjectAssignmentTime{
  assignment_time_id: number
  assignment_id: number
  employee_id:number
  start_time: Date
  end_time:Date
  description:string
  employee_name:string
}