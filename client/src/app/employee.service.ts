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
  getManagerNameByManagerId (manager_id: number) : Observable<APIReturn<string>> {
    return this.http.get<APIReturn<string>>(`https://localhost:44342/api/Employee/GetManagerNameByManagerId/${manager_id}`)
  }
  // TODO - change endpoint name
  getSecurityLevelByEmployeeId (employee_id: number) : Observable<APIReturn<string>> {
    return this.http.get<APIReturn<string>>(`https://localhost:44342/api/Employee/GetSecurityNameByEmployeeId/${employee_id}`)
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
