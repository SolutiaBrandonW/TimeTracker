import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { ProjectTimeEntryComponent } from 'src/app/project-time-entry/project-time-entry.component';
import { AppModule } from "../../app.module";

@Component({
  selector: 'app-project-entry-dialog',
  templateUrl: './project-entry-dialog.component.html',
  styleUrls: ['./project-entry-dialog.component.css']
})
export class ProjectEntryDialogComponent implements OnInit {

  form: FormGroup;
  project_id:number
  project_name:number
  start_date:Date
  end_date:Date
  description:string
  status_id:string
  editing = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProjectEntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.project_id = data.project_id;
    this.project_name = data.project_name;
    this.start_date = data.start_date;
    this.end_date = data.end_date;
    this.description = data.description;
    this.status_id = data.status_id;
    this.editing = true;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      project_id:new FormControl,
      project_name:new FormControl,
      start_date:new FormControl,
      end_date:new FormControl,
      status_id:new FormControl,
      description: new FormControl
    })

    this.form.patchValue({
      project_id: this.project_id,
      project_name: this.project_name,
      start_date: this.start_date,
      end_date: this.end_date,
      description: this.description,
      status_id: this.status_id
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
