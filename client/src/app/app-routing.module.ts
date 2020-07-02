import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { ProjectTimeEntryComponent } from './project-time-entry/project-time-entry.component';
import { ViewTimeComponent } from "./project-time-entry/view-time/view-time.component";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';


const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    {path: 'manager',
            loadChildren: ()=>import('./manager/manager.module')
                                        .then(m => m.ManagerModule)},
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

