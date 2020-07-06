import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { EmployeeService, Employee, EmployeeList } from '../../employee.service';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
import { ConfirmationDialogComponent } from "../../confirmation-dialog/confirmation-dialog.component";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  providers: [EmployeeService]
})
export class EmployeeListComponent implements OnInit {

  displayedColumns: string[] = ['first_name', 'last_name', 'manager_name', 'security_level', 'actions'];
  employees: EmployeeList[] = [];
  dataSource:MatTableDataSource<EmployeeList>
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table:MatTable<any>;
  constructor(private empServ: EmployeeService,
              public dialog: MatDialog,
              private _location: Location) { }
              
  ngOnInit(): void {
    this.getEmployeeList();
  }

  openEmployeeDialog(employee?: EmployeeList) {

    let editing = false;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    if (employee) {
      editing = true;
      dialogConfig.data = {
        employee_id: employee.employee_id,
        first_name: employee.first_name,
        last_name: employee.last_name,
        manager_id: employee.manager_id,
        security_level_id: employee.security_level_id,
        is_active: employee.is_active,
      }
    }

    const dialogRef = this.dialog.open(EmployeeDialogComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(data => {

      if (data != null) {
        if (editing) {
          this.empServ.updateEmployee(data).subscribe(val => {
            if (val.Code == 200) {
              this.getEmployeeList();
            }
          });
        } else {
          this.empServ.addEmployee(data).subscribe(val => {
            if (val.Code == 200) {
              this.getEmployeeList();
            }
          });
        }
      }
    })
  }

  deleteEmployee(employee_id: number) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'This will permenantly delete all employee assignments and assignment time entries.' },
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data === true) {
        this.empServ.deleteEmployeeById(employee_id).subscribe(val => {
          if (val.Code == 200) {
            this.employees = this.employees.filter(emp => emp.employee_id != employee_id);
            this.refreshTable();
          } else {
            console.log(val.Message);
          }
        });
      }
    })
  }

  getEmployeeList() {
    this.empServ.getEmployees().subscribe(employees_returned => {
      this.employees = employees_returned.Data;
      this.employees.forEach(emp => {
        this.empServ.getSecurityLevelByEmployeeId(emp.employee_id).subscribe(sec => {
          emp.security_level = sec.Data;
          if (emp.manager_id) {
            this.empServ.getManagerNameByManagerId(emp.manager_id).subscribe(man => {
              emp.manager_name = man.Data;
            });
          }
        });
      });
      this.dataSource = new MatTableDataSource<EmployeeList>(this.employees)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    });
  }

  refreshTable(){
    this.dataSource.data = this.employees;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  backClicked() {
    this._location.back();
  }
}

