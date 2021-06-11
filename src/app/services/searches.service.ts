import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { Doctor } from '../models/doctor.model';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchesService {
  
  constructor(private http: HttpClient) { }

  get token (): string {
    return localStorage.getItem('token') || '';
  }

  get headears(){
      return { headers: {'x-token': this.token }}
  }

  transformToUsers(result:any[]): User[]{
  
    return result.map( user => new User(user.name,user.email,'',user.img, user.role, user.google, user.uid));
  }

 
  transformToDoctors(result:any[]): Doctor[]{
  
    return result;
  }

  search(type: 'users'|'hospitals'|'doctors', terms: string) {

      const url =`${ base_url }/searches/collection/${type}/${terms}`;
  
      return this.http.get<any[]>(url, this.headears).pipe(
        map( (resp: any) => {
           switch (type) {

             case 'users':
              return this.transformToUsers(resp.result)
             case 'hospitals':
              return resp.result
             case 'doctors':
               return  this.transformToDoctors(resp.result)
           
             default:
               return [];
           }
          })
      );
      
  }

 
}
