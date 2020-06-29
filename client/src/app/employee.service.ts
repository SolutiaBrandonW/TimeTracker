import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs';
import { APIReturn } from '../app/api.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees () : Observable<APIReturn<Employee[]>> {
    return this.http.get<APIReturn<Employee[]>>(`https://localhost:44342/api/Employee/GetEmployees`)
  }
  
}

export class Employee {
  first_name: string;
  last_name: string;
  employee_id: number;
  manager_id: number;
  security_level_id: number;
  is_active: boolean;
}