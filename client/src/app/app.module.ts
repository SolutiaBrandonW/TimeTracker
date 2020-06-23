import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProjectTimeEntryComponent } from './project-time-entry/project-time-entry.component';
import { AddTimeComponent } from './project-time-entry/add-time/add-time.component';
import { EditTimeComponent } from './project-time-entry/edit-time/edit-time.component';
import { ViewTimeComponent } from './project-time-entry/view-time/view-time.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectTimeEntryComponent,
    AddTimeComponent,
    EditTimeComponent,
    ViewTimeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
