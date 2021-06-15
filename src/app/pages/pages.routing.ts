import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
    { path: 'dashboard', 
      component: PagesComponent, 
      canLoad: [AuthGuard],
      canActivate:[AuthGuard],
      loadChildren: () =>import('./child-routes.module').then(m => m.ChildRoutesModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
