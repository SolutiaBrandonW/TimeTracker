import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { AssignmentTimeEntry, AssignmentTimeService} from "../../assignment-time.service"
import { AssignmentService, AssignmentReturn } from "../../assignment.service";
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

  displayedColumns: string[] = ['start_date', 'end_date', 'description','actions'];
  assignmentTimes: AssignmentTimeEntry[] = [];
  employeeId: number = 3;
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

    // this.assiTimeServ.getAssignmentTimeEntries(this.employeeId).subscribe( assignmentTimes => {
    //   this.assignmentTimes = assignmentTimes
    //   console.log(assignmentTimes)
    // })

    this.assiTimeServ.getLoggedHoursByAssignment(this.assignmentId).subscribe(assignmentTimes => {
      this.assignmentTimes = assignmentTimes.Data
      console.log(assignmentTimes)
    })

  }

  editAssignmentTimeEntry(assignmentTime: AssignmentTimeEntry){
    console.log(`Edit time: ${assignmentTime.assignment_time_id}`)
    this.assiTimeServ.setSelectedAssignmentTimeEntry(assignmentTime)
    this.router.navigate(['/project-time-entry/edit-time/', assignmentTime.assignment_time_id]);
  }

  deleteAssignmentTimeEntry(assignmentTime: AssignmentTimeEntry){
    console.log(`Delete time: ${assignmentTime.assignment_time_id}`)
    this.assiTimeServ.setSelectedAssignmentTimeEntry(assignmentTime)
  }

  addAssignmentTimeEntry(projectName: string) {
    this.router.navigate(['/project-time-entry/add-time/', this.projectName]);
  }

  openDialogEdit(assignmentTimeEntry: AssignmentTimeEntry) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.data = {
      start_date: assignmentTimeEntry.start_time,
      end_date: assignmentTimeEntry.end_time,
      projectName: `Project ${assignmentTimeEntry.assignment_time_id}`,
      description: "test Description"
    }

    console.log(dialogConfig.data)

    const dialogRef = this.dialog.open(TimeEntryDialogComponent, dialogConfig)

    dialogRef.afterClosed().subscribe( data => console.log("Dialog output: ", data))


  }

  openDialogAdd() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.data = {
      start_date: undefined,
      end_date: undefined,
      projectName: `Project Name`,
      description: undefined
    }

    console.log(dialogConfig.data)

    const dialogRef = this.dialog.open(TimeEntryDialogComponent, dialogConfig)

    dialogRef.afterClosed().subscribe( data => console.log("Dialog output: ", data))
  }

  backClicked() {
    this._location.back();
  }
}
