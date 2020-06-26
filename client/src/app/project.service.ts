import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjectTimeEntries(employee_id) : Observable<ProjectTimeReturn> {
    return this.http.get<ProjectTimeReturn>(`https://localhost:44342/api/Employee/GetProjectsByEmployee/${employee_id}`)
  }

  getEmployeeProjectHours(employee_id: number, project_id: number) : Observable<number> {
    return this.http.get<number>(`https://localhost:44342/api/Employee/GetEmployeeProjectTime?employee_id=${employee_id}&project_id=${project_id}`)
  }

}

export class ProjectTime{
  projectId: number;
  projectName: string;
  projectHours: number;
  projectDescription: string;
  projectStatus: string;
}


export class ProjectTimeReturn {
  Message: string;
  Code: number
  Data: [
    {
      projectId: number;
      projectName: string;
      projectHours: number;
      projectDescription: string;
      projectStatus: string;
    }
  ]
}