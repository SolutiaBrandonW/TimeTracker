import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { ProjectTimeEntryComponent } from './project-time-entry/project-time-entry.component';
import { AddTimeComponent } from './project-time-entry/add-time/add-time.component';
import { EditTimeComponent } from './project-time-entry/edit-time/edit-time.component';
import { ViewTimeComponent } from './project-time-entry/view-time/view-time.component';

const appRoutes: Routes = [
    {path: 'project-time-entry', component: ProjectTimeEntryComponent},
    {path: 'project-time-entry/add/:string', component: AddTimeComponent},
    {path: 'project-time-entry/view/:string', component: ViewTimeComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule],
    providers: []
})

export class AppRoutingModule {}

