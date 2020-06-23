import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-time-entry-dialog',
  templateUrl: './time-entry-dialog.component.html',
  styleUrls: ['./time-entry-dialog.component.css']
})
export class TimeEntryDialogComponent implements OnInit {

  form: FormGroup;
  description:string;


    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<TimeEntryDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {

        this.description = data.description;
    }

  ngOnInit(): void {
    
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
