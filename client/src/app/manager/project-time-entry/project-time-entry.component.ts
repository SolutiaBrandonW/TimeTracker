import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Component, OnInit, ViewChild } from '@angular/core'

import { ProjectService, ProjectTimeEntry } from '../../project.service';
import { AssignmentService } from '../../assignment.service';
import { TimeEntryDialogComponent } from '../../time-entry-dialog/time-entry-dialog.component';
import { AssignmentTimeService } from "../../assignment-time.service";
import { ProjectEntryDialogComponent } from '../project-entry-dialog/project-entry-dialog.component';
import { AuthService } from 'src/app/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from "@angular/material/sort";

@Component({
  selector: 'app-project-time-entry',
  templateUrl: './project-time-entry.component.html',
  styleUrls: ['./project-time-entry.component.css']
})
export class ProjectTimeEntryComponent implements OnInit {

  displayedColumns: string[] = ['name', 'projectHours', 'description', 'status_name', 'actions'];
  currProjectTimeEntries: ProjectTimeEntry[];
  loading: boolean = true;
  employee_id;
  dataSource: MatTableDataSource<ProjectTimeEntry>
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private pte: ProjectService,
    private ate: AssignmentService,
    private atServ: AssignmentTimeService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    public as: AuthService,
    public es: EmployeeService) { }

  async ngOnInit() {
   // try {
      this.as.userProfile$.subscribe(res => {
        if (res != null) {
          this.es.getEmployeeByAuth0Id(res.sub).subscribe(result => {
            this.employee_id = result.Data.employee_id;
            this.pte.getProjects().subscribe(project_return => {
              this.currProjectTimeEntries = project_return.Data;
              this.currProjectTimeEntries.forEach(cpte => {
                this.ate.getAssignmentByProjectAndEmployee(cpte.project_id, this.employee_id).subscribe(assignment_return => {
                  // Get Assignment ID
                  if (assignment_return.Data != null) {
                    // if the project has an assignment associated with this manager,
                    cpte.hasRecord = true;
                    cpte.projectAssignmentId = assignment_return.Data.assignment_id;
                    this.pte.getEmployeeProjectHours(cpte.projectAssignmentId).subscribe(projectHours_return => {
                      // Get Assignment Hours
                      cpte.projectHours = projectHours_return.Data;
                    });
                  } else {
                    cpte.hasRecord = false;
                  }
                });
              });
              this.dataSource = new MatTableDataSource<ProjectTimeEntry>(this.currProjectTimeEntries);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
              this.loading = false;
            });

          })
        }
      })
    // } catch (e) {
    //   console.log("Error: " + e);
    // }
  }

  

  viewProject(projectName: string, project_id: number) {
    this.router.navigate(['view-project', projectName, project_id], { relativeTo: this.route });
  }

  viewEmployees() {
    this.router.navigate(['view-employees'], { relativeTo: this.route.parent });
  }

  openDialogAddProject() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
    }

    const dialogRef = this.dialog.open(ProjectEntryDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data != null) {
        console.log(data)
        this.pte.addProject(data).subscribe(result => {
          console.log(result)
          //reload projects window 
          this.pte.getProjects().subscribe(project_return => {
            this.currProjectTimeEntries = project_return.Data;
            this.currProjectTimeEntries.forEach(cpte => {
              this.ate.getAssignmentByProjectAndEmployee(cpte.project_id, this.employee_id).subscribe(assignment_return => {
                // Get Assignment ID
                if (assignment_return.Data != null) {
                  // if the project has an assignment associated with this manager,
                  cpte.hasRecord = true;
                  cpte.projectAssignmentId = assignment_return.Data.assignment_id;
                  this.pte.getEmployeeProjectHours(cpte.projectAssignmentId).subscribe(projectHours_return => {
                    // Get Assignment Hours
                    cpte.projectHours = projectHours_return.Data;
                  });
                } else {
                  cpte.hasRecord = false;
                }
              });
            });
            this.refreshTable();
          });
        
        })
      }
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
