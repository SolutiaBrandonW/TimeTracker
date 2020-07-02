import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {SwitchMap}
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { Project, ProjectService } from '../../project.service'
import { Assignment, AssignmentService } from '../../assignment.service'
import { AssignmentTime, AssignmentTimeService } from '../../assignment-time.service'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-view-assignment',
  templateUrl: './view-assignment.component.html',
  styleUrls: ['./view-assignment.component.css']
})
export class ViewAssignmentComponent implements OnInit {

  displayedColumns: string[] = ['start_time', 'end_time', 'description'];
  employee_role: string;
  project: Project;
  assignment: Assignment;
  project_id: number;
  assignment_id: number;
  employee_name: string;
  assignment_times: AssignmentTime[] = [];

  constructor( private assiTimeServ: AssignmentTimeService,
               private assiServ: AssignmentService,
               private projServ: ProjectService,
               public dialog: MatDialog,
               private _location: Location,
               private route: ActivatedRoute) {
    this.assignment_id = this.route.snapshot.params['assignment_id'];
    this.employee_name = this.route.snapshot.params['employee_name'];
  }

  ngOnInit(): void {

    this.assiServ.getAssignmentByAssignmentId(this.assignment_id).pipe(
      
      switchMap(assi => { this.assignment = assi.Data })

    );

    /** 
    this.assiServ.getAssignmentByAssignmentId(this.assignment_id).subscribe( assi => {
      this.assignment = assi.Data;
      // Get project info for name
      this.projServ.getProject(this.assignment.project_id).subscribe( proj => {
        this.project = proj.Data;
      });
      // Get role name
      this.assiServ.getRoleByRoleId(this.assignment.role_id).subscribe( role => {
        this.employee_role = role.Data;
      });
    });
    this.assiTimeServ.getLoggedHoursByAssignment(this.assignment_id).subscribe( assiTimes => {
      this.assignment_times = assiTimes.Data;
    });
    */
  }

  backClicked() {
    this._location.back();
  }
}
