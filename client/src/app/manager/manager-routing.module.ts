import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectTimeEntryComponent } from './project-time-entry/project-time-entry.component'
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  {path: 'project-time-entry', component: ProjectTimeEntryComponent},
  {path: 'employee-list', component: EmployeeListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
