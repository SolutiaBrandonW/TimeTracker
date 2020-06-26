import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import {Component, OnInit} from '@angular/core'

import { ProjectService, ProjectTimeEntry } from '../project.service';
import { AssignmentService } from '../assignment.service';
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
  loading: boolean = true;
  employee_id = 3;

  constructor(private pte: ProjectService,
              private ate: AssignmentService, 
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog) {}

  async ngOnInit() {
    try {
      await this.pte.getProjectTimeEntries(this.employee_id).subscribe(project_return => {
        this.currProjectTimeEntries = project_return.Data;
        this.currProjectTimeEntries.forEach(cpte => {
          this.ate.getAssignmentByProjectAndEmployee(cpte.project_id, this.employee_id).subscribe(assignment_return => {
            // Get Assignment ID
            cpte.projectAssignmentId = assignment_return.Data.assignment_id;
            this.pte.getEmployeeProjectHours(cpte.projectAssignmentId).subscribe(projectHours_return => {
              // Get Assignment Hours
              cpte.projectHours = projectHours_return.Data;
            });
          });
        });
        this.loading = false;
      });
    } catch (e) {
      console.log("Error: " + e);
    }
  }
  
  viewTimeEntry(projectName: string, assignmentId: number) {
    this.router.navigate(['view-time', projectName, assignmentId], {relativeTo: this.route});
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
