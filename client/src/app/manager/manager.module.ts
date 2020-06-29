import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ProjectTimeEntryComponent } from './project-time-entry/project-time-entry.component';


@NgModule({
  declarations: [ProjectTimeEntryComponent],
  imports: [
    CommonModule,
    ManagerRoutingModule
  ]
})
export class ManagerModule { }
