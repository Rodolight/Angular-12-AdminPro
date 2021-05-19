import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graphic1Component } from './pages/graphic1/graphic1.component';
import { NotpagefoundComponent } from './pages/notpagefound/notpagefound.component';
import { PagesComponent } from './pages/pages.component';

const ROUTES:Routes = [
 {path: '', component: PagesComponent, children: [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'progress', component: ProgressComponent},
  {path: 'graphic1', component: Graphic1Component},
  ]
 },
 

 {path: 'login', component: LoginComponent},
 {path: 'register', component: RegisterComponent},

//  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
 {path: '**', component: NotpagefoundComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  exports:[
    RouterModule
  ] 
})
export class AppRoutingModule { }
