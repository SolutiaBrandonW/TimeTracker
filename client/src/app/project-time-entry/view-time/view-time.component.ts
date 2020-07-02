import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { AssignmentTime, AssignmentTimeService} from "../../assignment-time.service"
import { AssignmentService } from "../../assignment.service";
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TimeEntryDialogComponent } from "../time-entry-dialog/time-entry-dialog.component";
import { MatButton } from "@angular/material/button";
import {Location} from '@angular/common';

@Component({
  selector: 'app-view-time',
  templateUrl: './view-time.component.html',
  styleUrls: ['./view-time.component.css']
})
export class ViewTimeComponent implements OnInit {
  displayedColumns: string[] = ['start_time', 'end_time', 'description','actions'];
  assignmentTimes: AssignmentTime[] = [];
  assignmentId: number;
  projectName: string;

  constructor(private assiTimeServ:AssignmentTimeService,
              private assiServ:AssignmentService,
              private route:ActivatedRoute,
              private router:Router,
              public dialog: MatDialog,
              private _location: Location) { }

  ngOnInit(): void {
    this.assignmentId = this.route.snapshot.params['assignmentId'];
    this.projectName = this.route.snapshot.params['projectName'];

    this.assiTimeServ.getLoggedHoursByAssignment(this.assignmentId).subscribe(assignmentTimes => {
      this.assignmentTimes = assignmentTimes.Data;
    });
  }

  editAssignmentTimeEntry(assignmentTime: AssignmentTime){
    console.log(`Edit time: ${assignmentTime.assignment_time_id}`);
    this.assiTimeServ.setSelectedAssignmentTimeEntry(assignmentTime);
    this.router.navigate(['/project-time-entry/edit-time/', assignmentTime.assignment_time_id]);
  }

  deleteAssignmentTimeEntry(assignmentTime: AssignmentTime){
    console.log(`Delete time: ${assignmentTime.assignment_time_id}`)
    this.assiTimeServ.deleteAssignmentTime(assignmentTime.assignment_time_id).subscribe(result =>{
      this.assiTimeServ.getLoggedHoursByAssignment(this.assignmentId).subscribe(assignmentTime_return => {
        this.assignmentTimes = assignmentTime_return.Data;
      })
    })
  }

  addAssignmentTimeEntry(projectName: string) {
    this.router.navigate(['/project-time-entry/add-time/', this.projectName]);
  }

  openDialogEdit(assignmentTimeEntry: AssignmentTime) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.data = {
      assignment_time_id: assignmentTimeEntry.assignment_time_id,
      assignment_id: assignmentTimeEntry.assignment_id,
      start_time: assignmentTimeEntry.start_time,
      end_time: assignmentTimeEntry.end_time,
      projectName: `Project ${assignmentTimeEntry.assignment_time_id}`,
      description: assignmentTimeEntry.description
    }

    const dialogRef = this.dialog.open(TimeEntryDialogComponent, dialogConfig)
    dialogRef.afterClosed().subscribe( data => {
      if(data != null){
        this.assiTimeServ.setSelectedAssignmentTimeEntry(data).subscribe(result => {
          this.assiTimeServ.getLoggedHoursByAssignment(this.assignmentId).subscribe(assignmentTime_return => {
            this.assignmentTimes = assignmentTime_return.Data;
          })
        })
      }
    })
  }

  openDialogAdd() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.data = {
      assignment_id: this.assignmentId,
      start_time: undefined,
      end_time: undefined,
      projectName: this.projectName,
      description: undefined
    }

    const dialogRef = this.dialog.open(TimeEntryDialogComponent, dialogConfig)

    dialogRef.afterClosed().subscribe( data => {
      if(data != null){
        this.assiTimeServ.addAssignmentTime(data).subscribe(result => {
          console.log(result)
          this.assiTimeServ.getLoggedHoursByAssignment(this.assignmentId).subscribe(assignmentTime_return => {
            this.assignmentTimes = assignmentTime_return.Data;
          })
        })
      }
    })
  }

  backClicked() {
    this._location.back();
  }

}
