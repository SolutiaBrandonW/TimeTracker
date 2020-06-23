import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-time',
  templateUrl: './add-time.component.html',
  styleUrls: ['./add-time.component.css']
})
export class AddTimeComponent implements OnInit {
  projectName: string;
  form: FormGroup;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.projectName = this.route.snapshot.params['projectName'];

    this.form = new FormGroup({
      project: new FormControl,
      start_time: new FormControl,
      end_time: new FormControl,
      description: new FormControl
    });
  }

  submitForm() {
    // Project Time Entry
    // probably need AssignmentTimeService
  }

}
