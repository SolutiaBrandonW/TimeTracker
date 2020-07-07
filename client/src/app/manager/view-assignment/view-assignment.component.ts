import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatTableDataSource } from '@angular/material/table';

import { Project, ProjectService } from '../../project.service'
import { Assignment, AssignmentService } from '../../assignment.service'
import { AssignmentTime, AssignmentTimeService } from '../../assignment-time.service'
import { AssignmentTimeDialogComponent } from '../assignment-time-dialog/assignment-time-dialog.component';
import { AssignmentEntryDialogComponent } from '../assignment-entry-dialog/assignment-entry-dialog.component';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-view-assignment',
  templateUrl: './view-assignment.component.html',
  styleUrls: ['./view-assignment.component.css']
})
export class ViewAssignmentComponent implements OnInit {

  displayedColumns: string[] = ['start_time', 'end_time', 'description', 'actions'];
  mat_table_data = new MatTableDataSource<AssignmentTime>();
  employee_role: string;
  project: Project;
  assignment: Assignment;
  assignment_id: number;
  employee_name: string;
  assignment_times: AssignmentTime[];

  constructor( private assiTimeServ: AssignmentTimeService,
               private assiServ: AssignmentService,
               private empServ: EmployeeService,
               private projServ: ProjectService,
               public dialog: MatDialog,
               private _location: Location,
               private route: ActivatedRoute) {
    this.assignment_id = this.route.snapshot.params['assignment_id'];
  }

  ngOnInit() {
    this.refreshPageData();
  }

  refreshPageData() {
    this.assiServ.getAssignmentByAssignmentId(this.assignment_id).subscribe( assi => {
      this.assignment = assi.Data;
      // Get project info for name
      this.projServ.getProject(this.assignment.project_id).subscribe( proj => {
        this.project = proj.Data;
      });
      this.empServ.getEmployeeByEmployeeId(this.assignment.employee_id).subscribe( emp => {
        this.employee_name = `${emp.Data.first_name} ${emp.Data.last_name}`;
      });
      // Get role name
      this.assiServ.getRoleByRoleId(this.assignment.role_id).subscribe( role => {
        this.employee_role = role.Data;
      });
    });
    this.assiTimeServ.getLoggedHoursByAssignment(this.assignment_id).subscribe( assiTimes => {
      this.assignment_times = assiTimes.Data;
      this.refreshTable();
    });
  }

  deleteAssignmentTime(assignment_time_id:number) {
    this.assiTimeServ.deleteAssignmentTime(assignment_time_id).subscribe(result => {
      if(result.Code == 200) {
        this.assignment_times = this.assignment_times.filter(ast => ast.assignment_time_id != assignment_time_id);
        this.refreshTable();
      } else {
        console.log(result.Message);
      }    
    });
  }

  deleteAssignment() {
    this.assiServ.deleteAssignmentByAssignmentId(this.assignment_id).subscribe(result => {
      if(result.Code == 200) {
        this.backClicked();
      } else {
        console.log(result.Message);
      }
    });
  }

  openAssignmentDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.data = {
      assignment_id: this.assignment.assignment_id,
      employee_id: this.assignment.employee_id,
      project_id: this.assignment.project_id,
      start_date: this.assignment.start_date,
      end_date: this.assignment.end_date,
      role_id: this.assignment.role_id,
      is_active: this.assignment.is_active,
      project_name: this.project.name
    }

    const dialogRef = this.dialog.open(AssignmentEntryDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data != null){
        this.assiServ.updateAssignment(data).subscribe(result => {
          if(result.Code == 200) {
            this.refreshPageData();
          } else {
            console.log(result.Message);
          }  
        });
      }
    });
  }
  
  openAssignmentTimeDialog(assignment_time: AssignmentTime) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.data = {
      assignment_time_id: assignment_time.assignment_time_id,
      assignment_id: assignment_time.assignment_id,
      start_time: assignment_time.start_time,
      end_time: assignment_time.end_time,
      description: assignment_time.description
    }

    const dialogRef = this.dialog.open(AssignmentTimeDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data != null){
        this.assiTimeServ.updateAssignmentTime(data).subscribe(ast => {
          if (ast.Code == 200) {
            var index = this.assignment_times.findIndex(x => x.assignment_time_id == data.assignment_time_id);
            this.assignment_times[index] = data;
            this.refreshTable();
          } else {
            console.log(ast.Message);
          }
        });
      }
    })
  }

  refreshTable () {
    this.mat_table_data.data = this.assignment_times;
  }

  backClicked() {
    this._location.back();
  }
}
