import { Component, OnInit } from '@angular/core';
import { AssignmentTimeEntry, AssignmentTimeService} from "../../assignment-time.service"
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-time',
  templateUrl: './view-time.component.html',
  styleUrls: ['./view-time.component.css']
})
export class ViewTimeComponent implements OnInit {

  //TODO: make sure to add assignment_time_id to the model and the stored procedure we we can update and delete it by id
  assignmentTimes: AssignmentTimeEntry[] = [];
  projectId: number;

  constructor(private assiSvc:AssignmentTimeService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {

    this.projectId = this.route.snapshot.params['projectId'];

    this.assiSvc.getAssignmentTimeEntries(this.projectId).subscribe( assignmentTimes => {
      this.assignmentTimes = assignmentTimes
      console.log(assignmentTimes)
    })
  }

  editAssignmentTimeEntry(assignmentTime: AssignmentTimeEntry){
    console.log(`Edit time: ${assignmentTime.assignment_time_id}`)
    this.assiSvc.setSelectedAssignmentTimeEntry(assignmentTime)
    //this.router.navigateByUrl('/project-time-entry/edit-time/', assignmentTime.assignment_time_id)
    this.router.navigate(['/project-time-entry/edit-time/', assignmentTime.assignment_time_id]);
    //this.router.navigate(['/project-time-entry/edit-time2/']);

    // this.selectedAssignmentTime = assignmentTime
    //this.router.navigateByUrl('/project-time-entry/edit-time/', {state: assignmentTime})
  }

  deleteAssignmentTimeEntry(assignmentTime: AssignmentTimeEntry){
    console.log(`Delete time: ${assignmentTime.assignment_time_id}`)
    this.assiSvc.setSelectedAssignmentTimeEntry(assignmentTime)
    // this.selectedAssignmentTime = assignmentTime
  }

  // getSelectedAssignmentTime():AssignmentTimeEntry{
  //   return this.selectedAssignmentTime
  // }

}