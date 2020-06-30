import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectAssignmentTime, AssignmentTimeService } from "../../assignment-time.service";


@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {
  displayedColumns: string[] = ['start_time', 'end_time', 'description','actions'];
  projectName: string
  project_id:number
  assignmentTimes: ProjectAssignmentTime[];

  constructor(private route:ActivatedRoute,
              private router:Router,
              private ats:AssignmentTimeService) { }

  ngOnInit(): void {
    this.projectName = this.route.snapshot.params['projectName'];
    this.project_id = this.route.snapshot.params['project_id'];
    this.ats.getAllAssignmentTimeByProject(this.project_id).subscribe(result => {
      //this.assignmentTimes = result.Data
      console.log(result.Data)
    })
  }
}
