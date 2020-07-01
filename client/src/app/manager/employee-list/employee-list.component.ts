import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { EmployeeService, Employee } from '../../employee.service';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  displayedColumns: string[] = ['first_name', 'last_name', 'manager_name', 'security_level', 'actions'];
  employees: EmployeeList[] = [];

  constructor(private empServ: EmployeeService,
              public dialog: MatDialog,
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

  openEmployeeDialog(employee: EmployeeList) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.data = {
      employee_id: employee.employee_id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      manager_name: employee.manager_name,
      manager_id: employee.manager_id,
      security_level: employee.security_level,
      security_level_id: employee.security_level_id,
      is_active: employee.is_active,
    }

    const dialogRef = this.dialog.open(EmployeeDialogComponent, dialogConfig)

    dialogRef.afterClosed().subscribe( data => {
      if(data != null){
        var tempEmp = new Employee();
        tempEmp.employee_id = data.employee_id;
        tempEmp.first_name = data.first_name;
        tempEmp.last_name = data.last_name;
        tempEmp.manager_id = data.manager_id;
        tempEmp.security_level_id = data.security_level_id;
        tempEmp.is_active = data.is_active;
        console.log(tempEmp);
        this.empServ.updateEmployee(tempEmp).subscribe( val => {
          if (val.Code == 200) {
            this.employees.map( emps => {
              if (emps.employee_id === data.employee_id) {
                emps = tempEmp;
              }
            });
          } else {
            console.log("Failed");
          }
        });
      }
    })
  }

  deleteEmployee(employee_id:number) {
    this.empServ.deleteEmployeeById(employee_id).subscribe( val => {
      if (val.Code == 200) {
        this.employees = this.employees.filter(emp => emp.employee_id != employee_id);
      }
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