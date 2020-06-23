import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProjectTimeEntryComponent } from './project-time-entry/project-time-entry.component';
import { AddTimeComponent } from './project-time-entry/add-time/add-time.component';
import { EditTimeComponent } from './project-time-entry/edit-time/edit-time.component';
import { ViewTimeComponent } from './project-time-entry/view-time/view-time.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";
import { TimeEntryDialogComponent } from './project-time-entry/time-entry-dialog/time-entry-dialog.component';
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent,
    ProjectTimeEntryComponent,
    AddTimeComponent,
    EditTimeComponent,
    ViewTimeComponent,
    TimeEntryDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[TimeEntryDialogComponent]
})
export class AppModule { }
