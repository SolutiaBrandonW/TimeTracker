import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";


@Component({
  selector: 'app-assignment-entry-dialog',
  templateUrl: './assignment-entry-dialog.component.html',
  styleUrls: ['./assignment-entry-dialog.component.css']
})
export class AssignmentEntryDialogComponent implements OnInit {

  form: FormGroup;
  employee_id: number
  project_id : number
  start_date: Date
  end_date: Date
  role_id: number
  editing = false;


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AssignmentEntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.employee_id = data.employee_id;
    this.project_id = data.project_id;
    this.start_date = data.start_date;
    this.end_date = data.end_date;
    this.role_id = data.role_id;
    this.editing = true;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      employee_id:new FormControl,
      project_id:new FormControl,
      start_date:new FormControl,
      end_date:new FormControl,
      role_id:new FormControl,
        })

    this.form.patchValue({
      employee_id: this.employee_id,
      project_id: this.project_id,
      start_date: this.start_date,
      end_date: this.end_date,
      role_id: this.role_id
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
