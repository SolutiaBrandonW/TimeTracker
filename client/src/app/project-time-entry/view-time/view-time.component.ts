import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { AssignmentTimeEntry, AssignmentTimeService} from "../../assignment-time.service"
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TimeEntryDialogComponent } from "../time-entry-dialog/time-entry-dialog.component";
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-view-time',
  templateUrl: './view-time.component.html',
  styleUrls: ['./view-time.component.css']
})
export class ViewTimeComponent implements OnInit {

  //TODO: make sure to add assignment_time_id to the model and the stored procedure we we can update and delete it by id
  assignmentTimes: AssignmentTimeEntry[] = [];
  projectId: number;
  projectName: string;

  constructor(private assiSvc:AssignmentTimeService,
              private route:ActivatedRoute,
              private router:Router,
              public dialog: MatDialog,) { }

  ngOnInit(): void {

    this.projectId = this.route.snapshot.params['projectId'];
    this.projectName = this.route.snapshot.params['projectName'];

    this.assiSvc.getAssignmentTimeEntries(this.projectId).subscribe( assignmentTimes => {
      this.assignmentTimes = assignmentTimes
      console.log(assignmentTimes)
    })
  }

  editAssignmentTimeEntry(assignmentTime: AssignmentTimeEntry){
    console.log(`Edit time: ${assignmentTime.assignment_time_id}`)
    this.assiSvc.setSelectedAssignmentTimeEntry(assignmentTime)
    //this.router.navigateByUrl('/project-time-entry/edit-time/', assignmentTime.assignment_time_id)
    this.router.navigate(['/project-time-entry/edit-time/', assignmentTime.assignment_time_id]);
    //this.router.navigate(['/project-time-entry/edit-time2/']);

    // this.selectedAssignmentTime = assignmentTime
    //this.router.navigateByUrl('/project-time-entry/edit-time/', {state: assignmentTime})
  }

  deleteAssignmentTimeEntry(assignmentTime: AssignmentTimeEntry){
    console.log(`Delete time: ${assignmentTime.assignment_time_id}`)
    this.assiSvc.setSelectedAssignmentTimeEntry(assignmentTime)
    // this.selectedAssignmentTime = assignmentTime
  }

  addAssignmentTimeEntry(projectName: string) {
    this.router.navigate(['/project-time-entry/add-time/', this.projectName]);
  }

  // getSelectedAssignmentTime():AssignmentTimeEntry{
  //   return this.selectedAssignmentTime
  // }

  openDialog(assignmentTimeEntry: AssignmentTimeEntry) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      start_date: assignmentTimeEntry.start_time,
      end_date: assignmentTimeEntry.end_time,
      projectName: `Project ${assignmentTimeEntry.assignment_time_id}`,
      description: "test Description"
    }

    //this.dialog.open(TimeEntryDialogComponent, dialogConfig);
    console.log(dialogConfig.data)

    const dialogRef = this.dialog.open(TimeEntryDialogComponent, dialogConfig)

    dialogRef.afterClosed().subscribe( data => console.log("Dialog output: ", data))


  }
}
