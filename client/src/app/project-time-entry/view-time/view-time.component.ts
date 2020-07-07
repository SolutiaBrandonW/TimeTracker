import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { AssignmentTime, AssignmentTimeService } from "../../services/assignment-time.service"
import { AssignmentService, Assignment } from "../../services/assignment.service";
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TimeEntryDialogComponent } from "../../time-entry-dialog/time-entry-dialog.component";
import { MatButton } from "@angular/material/button";
import { Location } from '@angular/common';
import { ConfirmationDialogComponent } from "../../confirmation-dialog/confirmation-dialog.component";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from "@angular/material/sort";
@Component({
  selector: 'app-view-time',
  templateUrl: './view-time.component.html',
  styleUrls: ['./view-time.component.css']
})
export class ViewTimeComponent implements OnInit {
  displayedColumns: string[] = ['start_time', 'end_time', 'description', 'actions'];
  assignmentTimes: AssignmentTime[] = [];
  assignmentId: number;
  projectName: string;
  dataSource: MatTableDataSource<AssignmentTime>
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private assiTimeServ: AssignmentTimeService,
    private assiServ: AssignmentService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private _location: Location) { }

  ngOnInit(): void {
    this.assignmentId = this.route.snapshot.params['assignmentId'];
    this.projectName = this.route.snapshot.params['projectName'];

    this.assiTimeServ.getLoggedHoursByAssignment(this.assignmentId).subscribe(assignmentTimes => {
      this.assignmentTimes = assignmentTimes.Data;
      this.dataSource = new MatTableDataSource<AssignmentTime>(this.assignmentTimes)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });
  }

  editAssignmentTimeEntry(assignmentTime: AssignmentTime) {
    console.log(`Edit time: ${assignmentTime.assignment_time_id}`);
    this.assiTimeServ.setSelectedAssignmentTimeEntry(assignmentTime);
    this.router.navigate(['/project-time-entry/edit-time/', assignmentTime.assignment_time_id]);
  }

  deleteAssignmentTimeEntry(assignmentTime: AssignmentTime) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'This will permanently delete this assignment time entry.' },
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data === true) {
        this.assiTimeServ.deleteAssignmentTime(assignmentTime.assignment_time_id).subscribe(result => {
          if (result.Code === 200) {
            this.assignmentTimes = this.assignmentTimes.filter(at => at.assignment_time_id != assignmentTime.assignment_time_id)
            this.refreshTable();
          }
        })
      }
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
    dialogRef.afterClosed().subscribe(data => {
      if (data != null) {
        this.assiTimeServ.setSelectedAssignmentTimeEntry(data).subscribe(result => {
          if (result.Code === 200) {
            var index = this.assignmentTimes.findIndex(obj => obj.assignment_time_id == data.assignment_time_id)
            this.assignmentTimes[index] = data;
            this.refreshTable();
          }
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

    dialogRef.afterClosed().subscribe(data => {
      if (data != null) {
        this.assiTimeServ.addAssignmentTime(data).subscribe(result => {
          this.assiTimeServ.getLoggedHoursByAssignment(this.assignmentId).subscribe(assignmentTime_return => {
            this.assignmentTimes = assignmentTime_return.Data;
            this.refreshTable()
          })
        })
      }
    })
  }

  refreshTable() {
    this.dataSource.data = this.assignmentTimes;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  backClicked() {
    this._location.back();
  }

}
