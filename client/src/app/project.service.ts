import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs';
import { APIReturn } from '../app/api.service';

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