import { Component, OnInit } from '@angular/core';

import { EmployeeService, Employee } from '../../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  displayedColumns: string[] = ['first_name', 'last_name', 'manager', 'security_level'];
  employees: Employee[] = [];

  constructor(private empServ: EmployeeService) { }

  ngOnInit(): void {
    this.empServ.getEmployees().subscribe( employees_returned => {
      this.employees = employees_returned.Data;
    });
  }

  backClicked() {

  }

}
