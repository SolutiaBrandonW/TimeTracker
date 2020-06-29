import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectTimeEntryComponent } from './project-time-entry/project-time-entry.component'

const routes: Routes = [
  {path: 'project-time-entry', component: ProjectTimeEntryComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
