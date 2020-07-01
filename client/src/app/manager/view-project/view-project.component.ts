import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectAssignmentTime, AssignmentTimeService } from "../../assignment-time.service";
import { ProjectService, Project } from "../../project.service";
import { AssignmentService, DetailedAssignment } from "../../assignment.service";
import {Location} from '@angular/common';
import { ProjectEntryDialogComponent } from '../project-entry-dialog/project-entry-dialog.component';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AssignmentEntryDialogComponent } from '../assignment-entry-dialog/assignment-entry-dialog.component';




@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {
  displayedColumns: string[] = ['start_time', 'end_time', 'description','employee_name'];
  projectName: string
  project_id:number
  project:Project
  statusName:string
  assignmentTimes: ProjectAssignmentTime[];
  assignments:DetailedAssignment[]
  employee_names:string

  constructor(private route:ActivatedRoute,
              private router:Router,
              private ats:AssignmentTimeService,
              private ps:ProjectService,
              private as:AssignmentService,
              private _location: Location,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.projectName = this.route.snapshot.params['projectName'];
    this.project_id = this.route.snapshot.params['project_id'];
    this.ats.getAllAssignmentTimeByProject(this.project_id).subscribe(result => {
      this.assignmentTimes = result.Data
      console.log(result.Data)
    })

    this.ps.getProject(this.project_id).subscribe(result => {
      console.log(result)
      if(result.Data != null){
        this.project = result.Data
        this.ps.getStatusName(this.project.status_id).subscribe(result => {
          if(result.Data != null){
            this.statusName = result.Data
          }
        })
        this.as.getAssignmentsByProject(this.project_id).subscribe(result =>{
          console.log(result)
          if(result.Data != null){
            this.assignments = result.Data
          }
        })
      }
    })
  }

  backClicked() {
    this._location.back();
  }

  editProject(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      name : this.projectName,
      project_id:this.project_id,
      start_date:this.project.start_date,
      end_date:this.project.end_date,
      description:this.project.description,
      status_id:this.project.status_id,
      editing : true,
    }

    const dialogRef = this.dialog.open(ProjectEntryDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe( data => {
      if(data != null){
        this.ps.updateProject(data).subscribe(result => {
          this.ps.getProject(this.project_id).subscribe(result => {
            console.log(result)
            if(result.Data != null){
              this.project = result.Data
              this.ps.getStatusName(this.project.status_id).subscribe(result => {
                if(result.Data != null){
                  this.statusName = result.Data
                }
              })
            }
          })
        })
      }
    })
  }

  openAssignmentDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      project_id : this.project_id,
      projectName: this.projectName
    }

    const dialogRef = this.dialog.open(AssignmentEntryDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe( data => {
        data.project_id = this.project_id;
        if(data != null){
         this.as.addAssignment(data).subscribe(result => {
           console.log(result)
           this.as.getAssignmentsByProject(this.project_id).subscribe(result =>{
            console.log(result)
            if(result.Data != null){
              this.assignments = result.Data
            }
          })
         })
       }
    })
  }

  deleteProject(){
    this.ps.deleteProject(this.project_id).subscribe(result => {
      console.log(result)
    })
    this.router.navigate(['project-time-entry'], {relativeTo: this.route.parent});
  }
}
