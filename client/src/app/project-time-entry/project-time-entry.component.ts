import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'

import { ProjectService, ProjectTimeEntry } from '../project.service';
import { AssignmentService } from '../assignment.service';
import { TimeEntryDialogComponent } from './time-entry-dialog/time-entry-dialog.component';
import { AssignmentTimeService } from "../assignment-time.service";
import { AuthService } from '../auth.service';
import { EmployeeService } from '../employee.service';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, mergeMap, filter } from "rxjs/operators";

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
  loggedIn: boolean = false;
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
    private as: AuthService,
    private es: EmployeeService) { }

  ngOnInit() {
    //get the employee id from the Auth Service
    this.as.employeeID$.pipe(
      map(employee_id => {
        this.employee_id = employee_id
        this.loggedIn = true;
        return employee_id;
      }),
      //filter out the null values (When it hasn't been created yet)
      filter(employee_id => employee_id != null),
      mergeMap(employee_id => {
        const projTimes = this.pte.getProjectTimeEntries(employee_id)
        return projTimes;
      })
    ).subscribe(result => {
      this.currProjectTimeEntries = result.Data
      //for each entry, get the assignment id and the project hours.
      this.currProjectTimeEntries.forEach(cpte => {
        this.ate.getAssignmentByProjectAndEmployee(cpte.project_id, this.employee_id).pipe(
          map(assignmentsReturn => {
            cpte.projectAssignmentId = assignmentsReturn.Data.assignment_id;
            return assignmentsReturn.Data
          }),
          mergeMap(assignments => this.pte.getEmployeeProjectHours(assignments.assignment_id))
        ).subscribe(projectHours => {
          cpte.projectHours = projectHours.Data
        })
      });
      this.refreshTable();
      this.loading = false;
    })
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
        //add the assignment
        this.atServ.addAssignmentTime(data).pipe(
          map(result => {
            return result.Code
          }),
          //filter out the negative codes
          filter(code => code === 200),
          mergeMap(() => this.pte.getEmployeeProjectHours(data.assignment_id))
        ).subscribe(hours => {
          if (hours.Code === 200) {
            //find the project and update the hours
            let project = this.currProjectTimeEntries.find(obj => obj.projectAssignmentId == assignment_id);
            project.projectHours = hours.Data;
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
