import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit {

  form: FormGroup;
  employee_id: number;
  first_name: string;
  last_name: string;
  manager_id: number;
  manager_name: string;
  security_level_id: number;
  security_level: string;
  is_active: boolean;

  constructor( private fb: FormBuilder,
               private dialogRef: MatDialogRef<EmployeeDialogComponent>,
               @Inject(MAT_DIALOG_DATA) data ) {
    this.employee_id = data.employee_id;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.manager_name = data.manager_name;
    this.manager_id = data.manager_id;
    this.security_level = data.security_level;
    this.security_level_id = data.security_level_id;
    this.is_active = data.is_active;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      employee_id: new FormControl,
      first_name: new FormControl("", [Validators.required]),
      last_name: new FormControl("", [Validators.required]),
      manager_name: new FormControl(""),
      manager_id: new FormControl,
      security_level: new FormControl("", [Validators.required]),
      security_level_id: new FormControl,
      is_active: new FormControl("", [Validators.required])
    })

    this.form.patchValue({
      employee_id: this.employee_id,
      first_name: this.first_name,
      last_name: this.last_name,
      manager_name: this.manager_name,
      manager_id: this.manager_id,
      security_level: this.security_level,
      security_level_id: this.security_level_id,
      is_active: this.is_active
    })

    console.log(this.is_active);
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
