import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectTimeEntryComponent } from './project-time-entry/project-time-entry.component'
import { ViewProjectComponent } from './view-project/view-project.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  {path: 'project-time-entry', component: ProjectTimeEntryComponent},
  {path: 'view-employees', component: EmployeeListComponent},
  {path: 'project-time-entry/view-project/:projectName/:project_id', component: ViewProjectComponent},
  {path: '**', redirectTo: 'project-time-entry'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
