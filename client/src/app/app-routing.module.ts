import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { ProjectTimeEntryComponent } from './project-time-entry/project-time-entry.component';

const appRoutes: Routes = [
    {path: 'project-time-entry', component: ProjectTimeEntryComponent},
    {path: '**', component: ProjectTimeEntryComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule],
    providers: []
})

export class AppRoutingModule {}

