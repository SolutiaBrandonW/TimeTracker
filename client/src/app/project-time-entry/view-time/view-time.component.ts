import { Component, OnInit } from '@angular/core';
import { AssignmentTimeEntry, ProjectService } from "../../project.service";
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Router } from '@angular/router';
import { TimeEntryDialogComponent } from "../time-entry-dialog/time-entry-dialog.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";


@Component({
  selector: 'app-view-time',
  templateUrl: './view-time.component.html',
  styleUrls: ['./view-time.component.css']
})
export class ViewTimeComponent implements OnInit {

  //TODO: make sure to add assignment_time_id to the model and the stored procedure we we can update and delete it by id
  assignmentTimes: AssignmentTimeEntry[] = []



  // selectedAssignmentTime: AssignmentTimeEntry
  // selectedID: number

  constructor(private projSvc:ProjectService, private router:Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.projSvc.getAssignmentTimeEntries(3).subscribe( assignmentTimes => {
      this.assignmentTimes = assignmentTimes
      console.log(assignmentTimes)
    })
  }

  editAssignmentTimeEntry(assignmentTime: AssignmentTimeEntry){
    console.log(`Edit time: ${assignmentTime.assignment_time_id}`)
    this.projSvc.setSelectedAssignmentTimeEntry(assignmentTime)
    //this.router.navigateByUrl('/project-time-entry/edit-time/', assignmentTime.assignment_time_id)
    this.router.navigate(['/project-time-entry/edit-time/', assignmentTime.assignment_time_id]);
    //this.router.navigate(['/project-time-entry/edit-time2/']);

    // this.selectedAssignmentTime = assignmentTime
    //this.router.navigateByUrl('/project-time-entry/edit-time/', {state: assignmentTime})
  }

  deleteAssignmentTimeEntry(assignmentTime: AssignmentTimeEntry){
    console.log(`Delete time: ${assignmentTime.assignment_time_id}`)
    this.projSvc.setSelectedAssignmentTimeEntry(assignmentTime)
    // this.selectedAssignmentTime = assignmentTime
  }

  // getSelectedAssignmentTime():AssignmentTimeEntry{
  //   return this.selectedAssignmentTime
  // }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: "angular"
    }

    //this.dialog.open(TimeEntryDialogComponent, dialogConfig);

    const dialogRef = this.dialog.open(TimeEntryDialogComponent, dialogConfig)

    dialogRef.afterClosed().subscribe( data => console.log("Dialog output: ", data))


  }
}
