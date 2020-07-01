import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectAssignmentTime, AssignmentTimeService } from "../../assignment-time.service";
import { ProjectService, Project } from "../../project.service";
import { AssignmentService, DetailedAssignment } from "../../assignment.service";
import {Location} from '@angular/common';



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
              private _location: Location) { }

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

  }

  deleteProject(){
    this.ps.deleteProject(this.project_id).subscribe(result => {
      console.log(result)
    })
    this.router.navigate(['project-time-entry'], {relativeTo: this.route.parent});
  }
}
