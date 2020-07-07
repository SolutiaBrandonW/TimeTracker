import { Component, OnInit } from '@angular/core';
import { AuthService, Profile } from '../services/auth.service';
import { EmployeeService, Employee } from '../services/employee.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  profile: Profile
  employee_id: number
  isManager = false;
  employee_name:string
  employee: Employee
  constructor(public auth: AuthService, private es: EmployeeService) { }

  ngOnInit(): void {
    this.auth.employeeID$.subscribe(empId =>{
      if(empId != null){
        this.employee_id = empId
        this.es.getSecurityLevelByEmployeeId(this.employee_id).subscribe(securityLevel => {
          if (securityLevel.Data === "Manager" || securityLevel.Data === "Super Manager") {
            this.isManager = true;
          }
        })
        this.es.getEmployeeByEmployeeId(this.employee_id).subscribe(emp => {
          if(emp != null){
            this.employee = emp.Data
            this.employee_name = this.employee.first_name;
          }
        })
      }
    })
  }
}
