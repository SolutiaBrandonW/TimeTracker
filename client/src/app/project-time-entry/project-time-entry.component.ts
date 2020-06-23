import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { ProjectService, ProjectTimeEntry } from '../project.service';
import { TimeEntryDialogComponent } from './time-entry-dialog/time-entry-dialog.component';

@Component({
  selector: 'app-project-time-entry',
  templateUrl: './project-time-entry.component.html',
  styleUrls: ['./project-time-entry.component.css'],
  providers: [ProjectService]
})
export class ProjectTimeEntryComponent implements OnInit {
  displayedColumns: string[] = ['project', 'hours', 'description', 'status', 'actions'];
  currProjectTimeEntries : ProjectTimeEntry[];
  employee_id = 1;

  constructor(private pte: ProjectService, 
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.pte.getProjectTimeEntries(this.employee_id).subscribe(projectEntries => {
      this.currProjectTimeEntries = projectEntries;
      //this.getProjectHourEntries(this.employee_id);
    });
  }

  getProjectHourEntries(employee_id: number) {
    for (let project of this.currProjectTimeEntries)
    this.pte.getEmployeeProjectHours(this.employee_id, project.projectId).subscribe(projectHours => {
      project.projectHours = projectHours;
    });
  }
  
  viewTimeEntry(projectId: number, projectName: string) {
    this.router.navigate(['view-time', projectId, projectName], {relativeTo: this.route});
  }

  openTimeEntryDialog(projectName: string) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      projectName: projectName
    }

    const dialogRef = this.dialog.open(TimeEntryDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe( data => console.log("Dialog output: ", data))
  }
}
