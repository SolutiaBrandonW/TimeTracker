import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { ProjectTimeEntryComponent } from './project-time-entry/project-time-entry.component';
import { ViewTimeComponent } from "./project-time-entry/view-time/view-time.component";
import { EditTimeComponent } from './project-time-entry/edit-time/edit-time.component';
import { AddTimeComponent } from './project-time-entry/add-time/add-time.component';

const appRoutes: Routes = [
    {path: 'project-time-entry', component: ProjectTimeEntryComponent},
    {path: 'project-time-entry/view-time', component: ViewTimeComponent},
    {path: 'project-time-entry/edit-time/:id', component: EditTimeComponent},
    {path: 'project-time-entry/add-time/:string', component: AddTimeComponent},
    {path: '**', component: ProjectTimeEntryComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule],
    providers: []
})

export class AppRoutingModule {}

