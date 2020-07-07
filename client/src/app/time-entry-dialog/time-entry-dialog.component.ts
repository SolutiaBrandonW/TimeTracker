import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
@Component({
  selector: 'app-time-entry-dialog',
  templateUrl: './time-entry-dialog.component.html',
  styleUrls: ['./time-entry-dialog.component.css']
})
export class TimeEntryDialogComponent implements OnInit {

  form: FormGroup;
  assignment_time_id:number
  assignment_id:number
  projectName:string
  start_time: Date
  end_time: Date
  description:string;
  editing = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TimeEntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.assignment_time_id = data.assignment_time_id;
    this.assignment_id = data.assignment_id;
    this.projectName = data.projectName;
    if (data.start_time &&
        data.end_time
        ) {
      this.start_time = data.start_time;
      this.end_time = data.end_time;
      this.description = data.description;
      this.editing = true;
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      assignment_time_id:new FormControl,
      assignment_id:new FormControl,
      projectName:new FormControl({value: "", disabled: true}, [Validators.required]),
      start_time:new FormControl('', [Validators.required]),
      end_time:new FormControl('', [Validators.required]),
      description: new FormControl('')
    })

    this.form.patchValue({
      assignment_time_id: this.assignment_time_id,
      assignment_id: this.assignment_id,
      projectName: this.projectName,
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
