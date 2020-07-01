import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCardModule, MatCard } from "@angular/material/card";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule, MatButton } from "@angular/material/button";
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import { ManagerRoutingModule } from './manager-routing.module';
import { ProjectTimeEntryComponent } from './project-time-entry/project-time-entry.component';
import { ProjectEntryDialogComponent } from './project-entry-dialog/project-entry-dialog.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { ViewAssignmentComponent } from './view-assignment/view-assignment.component';
import { AssignmentEntryDialogComponent } from './assignment-entry-dialog/assignment-entry-dialog.component';
import { MatIconModule } from "@angular/material/icon";
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
  declarations: [
    ProjectTimeEntryComponent, 
    ProjectEntryDialogComponent, 
    EmployeeListComponent, 
    ViewProjectComponent, 
    ViewAssignmentComponent,
    AssignmentEntryDialogComponent,
    EmployeeDialogComponent,
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule
  ],
  entryComponents:[ProjectEntryDialogComponent, AssignmentEntryDialogComponent, EmployeeDialogComponent]
})
export class ManagerModule { }
