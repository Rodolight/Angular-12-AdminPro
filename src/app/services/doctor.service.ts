import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Doctor } from '../models/doctor.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

 
  constructor(private http: HttpClient) { }

  get token (): string {
    return localStorage.getItem('token') || '';
  }

  get headears(){
      return { headers: {'x-token': this.token }}
  }

  loadDoctors(){

    const url =`${ base_url }/doctors`

    return  this.http.get<any>(url, this.headears).pipe(
      map( (resp: { ok: boolean , doctors: Doctor[] }) => resp.doctors)
    );
  }

  getDoctorById(id: string){

    const url =`${ base_url }/doctors/${id}`

    return  this.http.get<any>(url, this.headears).pipe(
      map( (resp: { ok: boolean , doctor: Doctor }) => resp.doctor)
    );
  }

  createDoctor(doctor: { name: string, hospital: string } ){

    const url =`${ base_url }/Doctors`
    return  this.http.post(url, doctor,this.headears);
  }
  
  updateDoctor( doctor: Doctor){

    const url =`${ base_url }/Doctors/${ doctor._id}`
    return  this.http.put(url, doctor,this.headears);
  }
  
  deleteDoctor(_id: string ){

    const url =`${ base_url }/Doctors/${ _id }`
    return  this.http.delete(url, this.headears);
  }
  
}
