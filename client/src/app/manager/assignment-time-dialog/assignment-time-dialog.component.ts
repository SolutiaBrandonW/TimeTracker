import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { AssignmentTimeService } from 'src/app/services/assignment-time.service';


@Component({
  selector: 'app-assignment-time-dialog',
  templateUrl: './assignment-time-dialog.component.html',
  styleUrls: ['./assignment-time-dialog.component.css']
})
export class AssignmentTimeDialogComponent implements OnInit {

  form: FormGroup;
  assignment_time_id: number;
  assignment_id: number;
  start_time: Date;
  end_time: Date;
  description: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AssignmentTimeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.assignment_time_id = data.assignment_time_id;
    this.assignment_id = data.assignment_id;
    this.start_time = data.start_time;
    this.end_time = data.end_time;
    this.description = data.description;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      assignment_time_id: new FormControl(),
      assignment_id: new FormControl(),
      start_time: new FormControl(),
      end_time: new FormControl(),
      description: new FormControl()
    })

    this.form.patchValue({
      assignment_time_id: this.assignment_time_id,
      assignment_id: this.assignment_id,
      start_time: this.start_time,
      end_time: this.end_time,
      description: this.description
    })
  }

  save() {
    if(this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}

