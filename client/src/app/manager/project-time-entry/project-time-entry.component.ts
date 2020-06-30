import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import {Component, OnInit} from '@angular/core'

import { ProjectService, ProjectTimeEntry } from '../../project.service';
import { AssignmentService } from '../../assignment.service';
import { TimeEntryDialogComponent } from '../../project-time-entry/time-entry-dialog/time-entry-dialog.component';
import { AssignmentTimeService } from "../../assignment-time.service";
import { ProjectEntryDialogComponent } from '../project-entry-dialog/project-entry-dialog.component';

@Component({
  selector: 'app-project-time-entry',
  templateUrl: './project-time-entry.component.html',
  styleUrls: ['./project-time-entry.component.css']
})
export class ProjectTimeEntryComponent implements OnInit {

  displayedColumns: string[] = ['project', 'hours', 'description', 'status', 'actions'];
  currProjectTimeEntries : ProjectTimeEntry[];
  loading: boolean = true;
  employee_id = 3;

  constructor(private pte: ProjectService,
              private ate: AssignmentService, 
              private atServ: AssignmentTimeService,
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

  viewProject(projectName: string, project_id: number) {
    this.router.navigate(['view-project', projectName, project_id], {relativeTo: this.route});
  }

  viewEmployees(){
    this.router.navigate(['view-employees'], {relativeTo: this.route.parent});
  }

  openDialogAddProject(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
    }

    const dialogRef = this.dialog.open(ProjectEntryDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe( data => {
      console.log(data)
    })
  }


  openTimeEntryDialog(projectName: string, assignment_id: number) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      projectName: projectName
    }

    const dialogRef = this.dialog.open(TimeEntryDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe( data => {
      if(data != null){
        data.assignment_id = assignment_id
        this.atServ.addAssignmentTime(data).subscribe(result => {
          this.pte.getEmployeeProjectHours(data.assignment_id).subscribe(projectHours_return => {
            let project = this.currProjectTimeEntries.find(obj => obj.projectAssignmentId == assignment_id);
            project.projectHours = projectHours_return.Data;
          });
        })
      }
    })
  }
}
