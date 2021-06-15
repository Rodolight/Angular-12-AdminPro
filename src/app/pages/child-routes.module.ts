import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphic1Component } from './graphic1/graphic1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalComponent } from './maintenance/hospital/hospital.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { DoctorComponent } from './maintenance/doctors/doctor.component';
import { SearchComponent } from './search/search.component';

import { AdminGuard } from '../guards/admin.guard';

const childRoutes : Routes = [
        {path: '', component: DashboardComponent, data:{title:'Dashboard'}},
        {path: 'account-setting', component: AccountSettingsComponent, data:{title:'Tema'}},
        {path: 'graphic1', component: Graphic1Component, data:{title:'Gráfica 1'}},
        {path: 'progress', component: ProgressComponent, data:{title:'ProgressBar'}},
        {path: 'promises', component: PromisesComponent, data:{title:'Promesas'}},
        {path: 'profile', component: ProfileComponent , data:{title:'Perfil de usuario'}},
        {path: 'rxjs', component: RxjsComponent , data:{title:'Rxjs'}},
        {path: 'search/:terms', component: SearchComponent , data:{title:'Busquedas'}},

        // Mantenimientos
        {path: 'doctors', component: DoctorsComponent , data:{title:'Mantenimiento de Médicos'}},
        {path: 'doctor/:id', component: DoctorComponent , data:{title:'Mantenimiento de Médicos'}},
        {path: 'hospitals', component: HospitalComponent , data:{title:'Mantenimiento de Hospitales'}},
        
        // Rutas de administradores
        {path: 'users', canActivate:[AdminGuard], component: UsersComponent , data:{title:'Mantenimiento de Usuarios'}},
        
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
