import { Component, OnInit } from '@angular/core';
import { AssignmentTimeEntry, ProjectService } from "../../project.service";

@Component({
  selector: 'app-view-time',
  templateUrl: './view-time.component.html',
  styleUrls: ['./view-time.component.css']
})
export class ViewTimeComponent implements OnInit {

  // assignmentTimes: AssignmentTimeEntry[] = [
  //   {assignment_id: 1, start_time: new Date(1,1,2000), end_time: new Date(1,2,2000)},
  //   {assignment_id: 1, start_time: new Date(1,3,2000), end_time: new Date(1,4,2000)},
  //   {assignment_id: 1, start_time: new Date(1,3,2000), end_time: new Date(1,4,2000)}
  // ]
  assignmentTimes: AssignmentTimeEntry[] = []

  constructor(private projSvc:ProjectService) { }

  ngOnInit(): void {
    //on init, populate the assignemntTimes array
    this.projSvc.getAssignmentTimeEntries(3).subscribe( assignmentTimes => {
      this.assignmentTimes = assignmentTimes
      console.log(assignmentTimes)
    })

  }

}