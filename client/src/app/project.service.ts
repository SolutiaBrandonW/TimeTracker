import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjectTimeEntries(employee_id: number) : Observable<ProjectTimeReturn<ProjectTimeEntry[]>> {
    return this.http.get<ProjectTimeReturn<ProjectTimeEntry[]>>(`https://localhost:44342/api/Employee/GetProjectsByEmployee/${employee_id}`)
  }

  getEmployeeProjectHours(assignment_id: number) : Observable<ProjectTimeReturn<number>> {
    return this.http.get<ProjectTimeReturn<number>>(`https://localhost:44342/api/Employee/GetEmployeeHoursByAssignment/${assignment_id}`)
  }

  getAllProjects():Observable<ProjectTimeReturn<ProjectTimeEntry[]>>{
    return this.http.get<ProjectTimeReturn<ProjectTimeEntry[]>>(`https://localhost:44342/api/Project/GetProjects`)
  }
}

export class ProjectTimeReturn<T> {
  Message:string;
  Code: number;
  Data: T;
}

export class ProjectTime{
  projectId: number;
  projectName: string;
  projectHours: number;
  projectDescription: string;
  projectStatus: string;
}

export class ProjectTimeEntry {
  project_id: number;
  projectAssignmentId: number;
  name: string;
  projectHours: number;
  projectDescription: string;
  projectStatus: string;
  projectIsActive: boolean;
}