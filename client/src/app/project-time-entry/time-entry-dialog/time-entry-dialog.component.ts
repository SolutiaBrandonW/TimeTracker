import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-time-entry-dialog',
  templateUrl: './time-entry-dialog.component.html',
  styleUrls: ['./time-entry-dialog.component.css']
})
export class TimeEntryDialogComponent implements OnInit {

  form: FormGroup;
  projectName:string
  start_date: Date
  end_date: Date
  description:string;
  editing = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TimeEntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.projectName = data.projectName;
    if (data.start_date &&
        data.end_date
        ) {
      this.start_date = data.start_date;
      this.end_date = data.end_date;
      this.description = data.description;
      this.editing = true;
    }
      
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      projectName:new FormControl({value: "", disabled: true}, [Validators.required]),
      start_date:new FormControl('', [Validators.required]),
      end_date:new FormControl('', [Validators.required]),
      description: new FormControl('')
    })

    this.form.patchValue({
      projectName: this.projectName,
      start_date: this.start_date,
      end_date: this.end_date,
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
