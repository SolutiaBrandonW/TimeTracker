import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { ProjectTimeEntryComponent } from './project-time-entry/project-time-entry.component';
import { TimeEntryDialogComponent } from './project-time-entry/time-entry-dialog/time-entry-dialog.component';
import { ViewTimeComponent } from "./project-time-entry/view-time/view-time.component";

const appRoutes: Routes = [
    {path: 'project-time-entry', component: ProjectTimeEntryComponent},
    {path: 'project-time-entry/view-time/:projectName/:assignmentId', component: ViewTimeComponent},
    {path: '**', redirectTo: 'project-time-entry'}
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule],
    providers: []
})

export class AppRoutingModule {}

