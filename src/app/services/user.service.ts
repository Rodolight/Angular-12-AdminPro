import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { loginForm } from '../interfaces/login-form.interface';
import { LoadUsers } from '../interfaces/load-users.interfaces';

import { User } from '../models/user.model';

const base_url = environment.base_url
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;
  public user!: User;

  constructor(private http: HttpClient,
              private router : Router,
              private zone: NgZone) { 
                this.googleInit();
              }

  get token (): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user.uid || '';
  }

  get headears(){
      return { headers: {'x-token': this.token }}
  }

  validateToken() : Observable<boolean> {

    return this.http.get(`${ base_url }/login/renew`, { headers: {'x-token': this.token }})
    .pipe(
      map((resp:any) =>{
       const { name,email,img,role,google, uid } = resp.user;
       this.user = new User(name,email,'',img,role,google,uid);
       localStorage.setItem('token', resp.token);
       return true
    }), 
    catchError(err => of(false)));

  }

  createUser(formData: RegisterForm) {
    
    return this.http.post(`${ base_url}/users`, formData)
    .pipe(
      tap((resp:any)=>{
        localStorage.setItem('token', resp.token);
      })
    )
    
  }

  updateProfile(data: { name: string, email: string, role: string}){
    data = {...data, role: this.user.role! };
    return this.http.put(`${ base_url}/users/${ this.uid }`, data, { headers: {'x-token': this.token }})
  }

  login(formData: loginForm){
    return this.http.post(`${ base_url}/login`, formData)
    .pipe(
      tap((resp:any)=>{
        localStorage.setItem('token', resp.token);
      })
    )
  }

  loginGoogle(token: string){
    return this.http.post(`${ base_url}/login/google`, { token })
    .pipe(
      tap((resp:any)=>{
        localStorage.setItem('token', resp.token);
      })
    )
  }

  googleInit(){
    return new Promise<void>(resolve => { 
    gapi.load('auth2', ()=>{
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: environment.google_client_id,
        cookiepolicy: 'single_host_origin',
      });
      resolve();
    });

  });

  }

  logout(){
    localStorage.removeItem('token');
  
    this.auth2.signOut().then(() => {
      this.zone.run(() => this.router.navigateByUrl('login'));
    });
  }

loadUsers(fromValue?: number, limit?: number){

    const url =`${ base_url }/users?from=${fromValue}&top=${limit}`

    return  this.http.get<LoadUsers>(url, this.headears).pipe(
      map( resp => {
        const users = resp.users.map( 
          user => new User(user.name,user.email,'',user.img, user.role, user.google, user.uid));

          return {
            total: resp.total,
            users
          };
      })
    );
           
  }

  deleteUser(user:User) {
    
    const url =`${ base_url }/users/${user.uid}`
    return this.http.delete(url, this.headears);
    
  }

  updateUserRole(user:User){
    return this.http.put(`${ base_url}/users/${ user.uid}`, user, { headers: {'x-token': this.token }})
  }
  
}