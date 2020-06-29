import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";

import { ManagerRoutingModule } from './manager-routing.module';
import { ProjectTimeEntryComponent } from './project-time-entry/project-time-entry.component';
import { ProjectEntryDialogComponent } from './project-entry-dialog/project-entry-dialog.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { ViewAssignmentComponent } from './view-assignment/view-assignment.component';
import { AssignmentEntryDialogComponent } from './assignment-entry-dialog/assignment-entry-dialog.component';


@NgModule({
  declarations: [ProjectTimeEntryComponent, ProjectEntryDialogComponent, EmployeeListComponent, ViewProjectComponent, ViewAssignmentComponent,AssignmentEntryDialogComponent],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ]
})
export class ManagerModule { }
