import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

import { Employee, EmployeeService, SecurityLevel } from "../../employee.service";

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
  security_level_id: number;
  is_active: boolean;
  editing: boolean = false;
  managers: Employee[] = [];
  security_levels: SecurityLevel[] = [];

  constructor( private fb: FormBuilder,
               private dialogRef: MatDialogRef<EmployeeDialogComponent>,
               private empServ: EmployeeService,
               @Inject(MAT_DIALOG_DATA) data ) {
    if (data) {
      this.editing = true;
      this.employee_id = data.employee_id;
      this.first_name = data.first_name;
      this.last_name = data.last_name;
      this.manager_id = data.manager_id;
      this.security_level_id = data.security_level_id;
      this.is_active = data.is_active;
      this.editing = data.editing;
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      employee_id: new FormControl(),
      first_name: new FormControl([Validators.required]),
      last_name: new FormControl([Validators.required]),
      manager_id: new FormControl(),
      security_level_id: new FormControl([Validators.required]),
      is_active: new FormControl([Validators.required])
    })

    this.form.patchValue({
      employee_id: this.employee_id,
      first_name: this.first_name,
      last_name: this.last_name,
      manager_id: this.manager_id,
      security_level_id: this.security_level_id,
      is_active: this.is_active
    })

    this.empServ.getAllManagers().subscribe(man => {
      this.managers = man.Data;
    });

    this.empServ.getAllSecurityLevels().subscribe(sec => {
      this.security_levels = sec.Data;
    });
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
