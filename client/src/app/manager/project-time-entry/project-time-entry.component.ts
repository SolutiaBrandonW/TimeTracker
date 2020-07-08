import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Component, OnInit, ViewChild } from '@angular/core'

import { ProjectService, ProjectTimeEntry } from '../../services/project.service';
import { AssignmentService } from '../../services/assignment.service';
import { TimeEntryDialogComponent } from '../../time-entry-dialog/time-entry-dialog.component';
import { AssignmentTimeService } from "../../services/assignment-time.service";
import { ProjectEntryDialogComponent } from '../project-entry-dialog/project-entry-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from "@angular/material/sort";
import { map, mergeMap, filter } from "rxjs/operators";
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-project-time-entry',
  templateUrl: './project-time-entry.component.html',
  styleUrls: ['./project-time-entry.component.css']
})
export class ProjectTimeEntryComponent implements OnInit {

  displayedColumns: string[] = ['name', 'projectHours', 'description', 'status_name', 'actions'];
  currProjectTimeEntries: ProjectTimeEntry[];
  loading: boolean = true;
  employee_id: number
  dataSource = new MatTableDataSource<ProjectTimeEntry>();
  private paginator: MatPaginator;
  private sort: MatSort;
  @ViewChild(MatSort, { static: false }) set MatSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.dataSource.paginator = mp;
  }
  constructor(private pte: ProjectService,
    private ate: AssignmentService,
    private atServ: AssignmentTimeService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    public as: AuthService,
    public es: EmployeeService) { }

  ngOnInit() {
    this.as.employeeID$.pipe(
      map(employee_id => {
        this.employee_id = employee_id
        return employee_id;
      }),
      //filter out the null values (When it hasn't been created yet)
      filter(employee_id => employee_id != null),
      mergeMap(employee_id => {
        const projTimes = this.pte.getProjects()
        return projTimes;
      })
    ).subscribe(result => {
      this.currProjectTimeEntries = result.Data
      //for each entry, get the assignment id and the project hours.
      this.currProjectTimeEntries.forEach(cpte => {
        const assignments = this.ate.getAssignmentByProjectAndEmployee(cpte.project_id, this.employee_id)
        const hours = this.pte.getHoursByProject(cpte.project_id)
        forkJoin([assignments, hours]).subscribe(result => {
          if (result[0].Data != null) {
            cpte.projectAssignmentId = result[0].Data.assignment_id
            cpte.hasRecord = true;
          } else {
            cpte.hasRecord = false;
          }
          cpte.projectHours = result[1].Data
        })
      });
      this.refreshTable();
      this.loading = false;
    })
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
        this.pte.addProject(data).subscribe(result => {
          if (result.Code === 200) {
            data.hasRecord = false;
            this.currProjectTimeEntries.push(data)
            this.refreshTable()
          }
        })
      }
    })
  }


  openTimeEntryDialog(projectName: string, assignment_id: number) {
    this.ate.getAssignmentByAssignmentId(assignment_id).subscribe(assiReturn => {
      if (assiReturn.Code === 200) {

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.minWidth = 350,
          dialogConfig.data = {
            projectName: projectName,
            assignment: assiReturn.Data
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
    })
  }
  refreshTable() {
    this.dataSource.data = this.currProjectTimeEntries;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
