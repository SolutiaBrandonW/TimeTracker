import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs';
import { APIReturn, APIMetaReturn } from '../app/api.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  constructor(private http: HttpClient) { }

  getAssignmentByProjectAndEmployee(project_id: number, employee_id: number) : Observable<APIReturn<Assignment>> {
    return this.http.get<APIReturn<Assignment>>(`https://localhost:44342/api/Assignment/getAssignmentByProjectAndEmployee?project_id=${project_id}&employee_id=${employee_id}`)
  }

  getAssignmentsByProject(project_id:number): Observable<APIReturn<DetailedAssignment[]>>{
    return this.http.get<APIReturn<DetailedAssignment[]>>(`https://localhost:44342/api/Assignment/GetAssignmentsByProject/${project_id}`)
  }

  getAllRoles():Observable<APIReturn<Role[]>>{
    return this.http.get<APIReturn<Role[]>>(`https://localhost:44342/api/Assignment/GetAllRoles`)
  }

  addAssignment(assignment:Assignment):Observable<APIMetaReturn>{
    return this.http.post<APIMetaReturn>("https://localhost:44342/api/Assignment/CreateEmployeeAssignment", assignment)
  }
}

export class Assignment {
  assignment_id: number;
  project_id: number;
  employee_id: number;
  start_date: Date;
  end_date: Date;
  role_id: number;
  is_active: boolean;
}

//Used on the edit project screen to display employee names and role names 
export class DetailedAssignment {
  assignment_id: number;
  project_id: number;
  employee_id: number;
  employee_name: string;
  start_date: Date;
  end_date: Date;
  role_id: number;
  role_name: string;
  is_active:boolean
}

export class Role{
  role_id:number
  role_name:string
}