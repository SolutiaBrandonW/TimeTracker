import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

import { EmployeeService, Employee } from '../../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  displayedColumns: string[] = ['first_name', 'last_name', 'manager_name', 'security_level'];
  employees: EmployeeList[] = [];

  constructor(private empServ: EmployeeService,
              private _location: Location) { }

  ngOnInit(): void {
    this.empServ.getEmployees().subscribe( employees_returned => {
      this.employees = employees_returned.Data;
      this.employees.forEach( emp => {
        if (emp.manager_id) {
          this.empServ.getManagerNameByManagerId(emp.manager_id).subscribe(man => {
            emp.manager_name = man.Data;
          });
        }
        this.empServ.getSecurityLevelByEmployeeId(emp.employee_id).subscribe(sec => {
          emp.security_level = sec.Data;
        });
      });
    });
  }

  backClicked() {
    this._location.back();
  }
}

class EmployeeList extends Employee{
  manager_name?: string;
  security_level?: string;
}