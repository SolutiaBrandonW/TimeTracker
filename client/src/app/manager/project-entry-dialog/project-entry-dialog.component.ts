import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Status, ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-entry-dialog',
  templateUrl: './project-entry-dialog.component.html',
  styleUrls: ['./project-entry-dialog.component.css']
})
export class ProjectEntryDialogComponent implements OnInit {

  form: FormGroup;
  project_id:number
  name:number
  start_date:Date
  end_date:Date
  description:string
  status_id:string
  is_active:boolean
  editing = false;

  statuses:Status[]

  constructor(
    private fb: FormBuilder,
    private ps: ProjectService,
    private dialogRef: MatDialogRef<ProjectEntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.project_id = data.project_id;
    this.name = data.name;
    this.start_date = data.start_date;
    this.end_date = data.end_date;
    this.description = data.description;
    this.status_id = data.status_id;
    this.is_active = data.is_active;
    this.editing = data.editing;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      project_id:new FormControl,
      name:new FormControl,
      start_date:new FormControl,
      end_date:new FormControl,
      status_id:new FormControl,
      description: new FormControl,
      is_active:new FormControl,
    })

    this.form.patchValue({
      project_id: this.project_id,
      name: this.name,
      start_date: this.start_date,
      end_date: this.end_date,
      description: this.description,
      status_id: this.status_id,
      is_active:this.is_active
    })

    this.ps.getAllStatuses().subscribe(result=>{
        if(result.Data != null){
          this.statuses = result.Data
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
