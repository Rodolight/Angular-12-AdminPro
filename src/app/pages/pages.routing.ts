import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphic1Component } from './graphic1/graphic1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
    { path: 'dashboard', component: PagesComponent, canActivate:[AuthGuard], children: [
        
        {path: '', component: DashboardComponent, data:{title:'Dashboard'}},
        {path: 'progress', component: ProgressComponent, data:{title:'ProgressBar'}},
        {path: 'graphic1', component: Graphic1Component, data:{title:'Gráfica 1'}},
        {path: 'promises', component: PromisesComponent, data:{title:'Promesas'}},
        {path: 'account-setting', component: AccountSettingsComponent, data:{title:'Tema'}},
        {path: 'rxjs', component: RxjsComponent , data:{title:'Rxjs'}},
        ]
    },
  
    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
