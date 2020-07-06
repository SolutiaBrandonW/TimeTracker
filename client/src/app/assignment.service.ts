import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs';
import { APIReturn, APIMetaReturn } from '../app/api.service';
import { AssignmentTime } from './assignment-time.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  constructor(private http: HttpClient) { }

  deleteAssignmentByAssignmentId(assignment_id: number) : Observable<APIMetaReturn> {
    return this.http.get<APIMetaReturn>(`https://localhost:44342/api/Assignment/DeleteAssignmentByAssignmentId/${assignment_id}`);
  }

  updateAssignment(assignment: Assignment) : Observable<APIMetaReturn> {
    return this.http.post<APIMetaReturn>("https://localhost:44342/api/Assignment/UpdateAssignment", assignment)
  }

  getAssignmentByProjectAndEmployee(project_id: number, employee_id: number) : Observable<APIReturn<Assignment>> {
    return this.http.get<APIReturn<Assignment>>(`https://localhost:44342/api/Assignment/getAssignmentByProjectAndEmployee?project_id=${project_id}&employee_id=${employee_id}`)
  }

  getAssignmentByAssignmentId(assignment_id: number) : Observable<APIReturn<Assignment>> {
    return this.http.get<APIReturn<Assignment>>(`https://localhost:44342/api/Assignment/getAssignmentByAssignmentId/${assignment_id}`)
  }

  getAssignmentsByProject(project_id:number): Observable<APIReturn<DetailedAssignment[]>>{
    return this.http.get<APIReturn<DetailedAssignment[]>>(`https://localhost:44342/api/Assignment/GetAssignmentsByProject/${project_id}`)
  }

  getRoleByRoleId(role_id: number) : Observable<APIReturn<string>> {
    return this.http.get<APIReturn<string>>(`https://localhost:44342/api/Assignment/GetRoleByRoleId/${role_id}`)
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
}

export class Role{
  role_id:number
  role_name:string
}