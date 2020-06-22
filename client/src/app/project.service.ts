import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectTimeEntries: ProjectTimeEntry[] = [
    {
      "projectId": 1,
      "projectName":"TimeCube",
      "projectHours": 17000,
      "projectDescription":"Theory of Everything",
      "projectStatus":"Complete"
    },
    {
      "projectId": 2,
      "projectName":"Woop",
      "projectHours":2,
      "projectDescription":"Woop Woop",
      "projectStatus":"In Progress"
    },
  ];

  constructor(private http:HttpClient) { }

  getProjectTimeEntries() {
    return this.projectTimeEntries;
  }

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


export class ProjectTimeEntry {
  projectId: number;
  projectName: string;
  projectHours: number;
  projectDescription: string;
  projectStatus: string;
}