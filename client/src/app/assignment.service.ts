import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http: HttpClient) { }

  getAssignmentByProjectAndEmployee(project_id: number, employee_id: number) : Observable<AssignmentReturn> {
    return this.http.get<AssignmentReturn>(`https://localhost:44342/api/Assignment/getAssignmentByProjectAndEmployee?project_id=${project_id}&employee_id=${employee_id}`)
  }

}

export class AssignmentReturn{

  Message:string;
  Code: number;
  Data: {
    assignment_id: number,
    project_id: number,
    employee_id: number,
    start_date: Date,
    end_date: Date,
    role_id: number
  }
}