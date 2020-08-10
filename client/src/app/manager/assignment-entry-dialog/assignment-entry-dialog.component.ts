import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Employee, EmployeeService } from 'src/app/services/employee.service';
import { Role, AssignmentService } from 'src/app/services/assignment.service';


@Component({
  selector: 'app-assignment-entry-dialog',
  templateUrl: './assignment-entry-dialog.component.html',
  styleUrls: ['./assignment-entry-dialog.component.css']
})
export class AssignmentEntryDialogComponent implements OnInit {

  form: FormGroup;
  assignment_id: number
  employee_id: number
  project_name:string
  project_id : number
  start_date: Date
  end_date: Date
  role_id: number
  is_active: boolean
  editing: boolean = false
  employees:Employee[]
  roles:Role[]

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AssignmentEntryDialogComponent>,
    private es:EmployeeService,
    private as:AssignmentService,
    @Inject(MAT_DIALOG_DATA) data) {
    if (data.assignment_id) {
      this.editing = true;
      this.assignment_id = data.assignment_id;
    }
    this.employee_id = data.employee_id;
    this.project_id = data.project_id;
    this.start_date = data.start_date;
    this.end_date = data.end_date;
    this.role_id = data.role_id;
    this.is_active = data.is_active;
    this.project_name = data.project_name;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      assignment_id: new FormControl,
      employee_id:new FormControl,
      project_name:new FormControl({value: "", disabled: true}),
      project_id:new FormControl,
      start_date:new FormControl,
      end_date:new FormControl,
      role_id:new FormControl,
      is_active: new FormControl
    })

    this.form.patchValue({
      assignment_id: this.assignment_id,
      employee_id: this.employee_id,
      project_name: this.project_name,
      project_id: this.project_id,
      start_date: this.start_date,
      end_date: this.end_date,
      role_id: this.role_id,
      is_active: this.is_active
    })

    this.es.getEmployees().subscribe(result => {
      if(result.Data != null){
        this.employees = result.Data
      }
    })

    this.as.getAllRoles().subscribe(result => {
      if(result.Data != null){
        this.roles = result.Data
      }
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
