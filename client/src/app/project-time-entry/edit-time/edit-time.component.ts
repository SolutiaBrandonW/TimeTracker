import { Component, OnInit, Input } from '@angular/core';
import { AssignmentTimeService, AssignmentTimeEntry } from "../../assignment-time.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ViewTimeComponent } from "../view-time/view-time.component";



@Component({
  selector: 'app-edit-time',
  templateUrl: './edit-time.component.html',
  styleUrls: ['./edit-time.component.css']
})
export class EditTimeComponent implements OnInit {

  assignmentTime:AssignmentTimeEntry

  state$: Observable<object>;

  constructor(private assiServ:AssignmentTimeService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.state$ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))

      this.state$.subscribe(data => {
       
    })

    this.assignmentTime = this.assiServ.getSelectedAssignmentTimeEntry()
    console.log(this.assignmentTime)

  }

  onSubmit(){
      console.log(this.activatedRoute.params['id'])
  }

}
