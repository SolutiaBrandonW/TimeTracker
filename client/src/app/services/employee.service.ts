import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs';
import { APIReturn, APIMetaReturn } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAllSecurityLevels () : Observable<APIReturn<SecurityLevel[]>> {
    return this.http.get<APIReturn<SecurityLevel[]>>(`https://localhost:44342/api/Employee/GetAllSecurityLevels`);
  }

  addEmployee (employee: Employee) : Observable<APIMetaReturn> {
    return this.http.post<APIMetaReturn>(`https://localhost:44342/api/Employee/AddEmployee`, employee)
  }

  getEmployees () : Observable<APIReturn<Employee[]>> {
    return this.http.get<APIReturn<Employee[]>>(`https://localhost:44342/api/Employee/GetEmployees`);
  }

  getAllManagers () : Observable<APIReturn<Employee[]>> {
    return this.http.get<APIReturn<Employee[]>>(`https://localhost:44342/api/Employee/GetAllManagers`);
  }

  updateEmployee (employee: Employee) : Observable<APIMetaReturn> {
    return this.http.post<APIMetaReturn>(`https://localhost:44342/api/Employee/UpdateEmployee`, employee);
  }

  deleteEmployeeById (employee_id: number) : Observable<APIMetaReturn> {
    return this.http.get<APIMetaReturn>(`https://localhost:44342/api/Employee/DeleteEmployeeById/${employee_id}`);
  }
  
  getManagerNameByManagerId (manager_id: number) : Observable<APIReturn<string>> {
    return this.http.get<APIReturn<string>>(`https://localhost:44342/api/Employee/GetManagerNameByManagerId/${manager_id}`);
  }

  getSecurityLevelByEmployeeId (employee_id: number) : Observable<APIReturn<string>> {
    return this.http.get<APIReturn<string>>(`https://localhost:44342/api/Employee/GetSecurityLevelByEmployeeId/${employee_id}`);
  }

  getEmployeeByAuth0Id(auth0_id:string):Observable<APIReturn<Employee>>{
    return this.http.get<APIReturn<Employee>>(`https://localhost:44342/api/Employee/GetEmployeeByAuth0ID/${auth0_id}`);
  }

  getEmployeeByEmployeeId(employee_id: number) : Observable<APIReturn<Employee>> {
    return this.http.get<APIReturn<Employee>>(`https://localhost:44342/api/Employee/GetEmployeeByEmployeeId/${employee_id}`);
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

export class EmployeeList extends Employee {
  manager_name?: string;
  security_level?: string;
}

export class SecurityLevel {
  security_level: string;
  security_level_id: number;
}