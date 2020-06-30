import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs';
import { APIReturn, APIMetaReturn } from '../app/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjects() : Observable<APIReturn<ProjectTimeEntry[]>> {
    return this.http.get<APIReturn<ProjectTimeEntry[]>>(`https://localhost:44342/api/Project/GetProjects`)
  }

  getProjectTimeEntries(employee_id: number) : Observable<APIReturn<ProjectTimeEntry[]>> {
    return this.http.get<APIReturn<ProjectTimeEntry[]>>(`https://localhost:44342/api/Employee/GetProjectsByEmployee/${employee_id}`)
  }

  getEmployeeProjectHours(assignment_id: number) : Observable<APIReturn<number>> {
    return this.http.get<APIReturn<number>>(`https://localhost:44342/api/Employee/GetEmployeeHoursByAssignment/${assignment_id}`)
  }

  addProject(project:Project):Observable<APIMetaReturn>{
    return this.http.post<APIMetaReturn>("https://localhost:44342/api/Project/addProject", project)
  }
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

export class Project{
  project_id:number
  name:number
  start_date:Date
  end_date:Date
  description:string
  status_id:string
}