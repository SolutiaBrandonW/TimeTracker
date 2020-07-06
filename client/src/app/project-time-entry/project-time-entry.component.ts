import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Component, OnInit, ViewChild } from '@angular/core'

import { ProjectService, ProjectTimeEntry } from '../project.service';
import { AssignmentService } from '../assignment.service';
import { TimeEntryDialogComponent } from './time-entry-dialog/time-entry-dialog.component';
import { AssignmentTimeService } from "../assignment-time.service";
import { AuthService } from '../auth.service';
import { EmployeeService } from '../employee.service';
import { MatPaginator } from "@angular/material/paginator";
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-project-time-entry',
  templateUrl: './project-time-entry.component.html',
  styleUrls: ['./project-time-entry.component.css'],
  providers: [ProjectService]
})
export class ProjectTimeEntryComponent implements OnInit {
  displayedColumns: string[] = ['name', 'projectHours', 'description', 'status_name', 'actions'];
  currProjectTimeEntries: ProjectTimeEntry[];
  loading: boolean = true;
  employee_id: number
  loggedIn:boolean = false;
  dataSource: MatTableDataSource<ProjectTimeEntry>
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private pte: ProjectService,
    private ate: AssignmentService,
    private atServ: AssignmentTimeService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private as: AuthService,
    private es: EmployeeService) { }

  async ngOnInit() {
   // try {
      this.as.userProfile$.subscribe(res => {
        if (res != null) {
          this.es.getEmployeeByAuth0Id(res.sub).subscribe(result => {
            this.employee_id = result.Data.employee_id;
            this.loggedIn = true;

            this.pte.getProjectTimeEntries(this.employee_id).subscribe(project_return => {
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
              this.dataSource = new MatTableDataSource<ProjectTimeEntry>(this.currProjectTimeEntries);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
              console.log(this.dataSource.paginator)
              this.loading = false;
            });
          })
        }
      })


    // } catch (e) {
    //   console.log("Error: " + e);
    // }
  }

  public async initializeData() {
    this.employee_id = this.as.employee_id;
  }

  viewTimeEntry(projectName: string, assignmentId: number) {
    this.router.navigate(['view-time', projectName, assignmentId], { relativeTo: this.route });
  }

  openTimeEntryDialog(projectName: string, assignment_id: number) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      projectName: projectName
    }

    const dialogRef = this.dialog.open(TimeEntryDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data != null) {
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
  refreshTable(){
    this.dataSource.data = this.currProjectTimeEntries;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
