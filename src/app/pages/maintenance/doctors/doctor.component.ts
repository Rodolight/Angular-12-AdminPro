import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Hospital } from '../../../models/hospital.model';
import { Doctor } from '../../../models/doctor.model';

import { HospitalService } from '../../../services/hospital.service';
import { DoctorService } from '../../../services/doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
})
export class DoctorComponent implements OnInit {
  public doctorForm! : FormGroup;
  public hospitals : Hospital[] = [];
  public selectedHospital! : Hospital;
  public selectedDoctor! : Doctor;

  constructor( private fb: FormBuilder,
               private hospitaService: HospitalService,
               private doctorService: DoctorService,
               private router: Router,
               private activatedRoute: ActivatedRoute  ) { }

  ngOnInit(): void {
    this.doctorForm = this.fb.group({
      name : ['Edwin Rodriguez', Validators.required],
      hospital: ['', Validators.required]
    });

    this.loadHospitals()
    this.activatedRoute.params.subscribe(({id}) => this.loadDoctorById(id))
  }

  loadHospitals(){
    this.hospitaService.loadHospitals().subscribe( hospitals => this.hospitals = hospitals);
  }

  loadDoctorById(id:string){
    if (id === "new"){
      return;
    }
    
    this.doctorService.getDoctorById(id)
    .subscribe((doctor:any) => {
      this.selectedDoctor = doctor;
      const { name, hospital:{_id} } = doctor;
      this.selectedDoctor = doctor;
      this.doctorForm.setValue({name, hospital:_id})
    }, errr => {
      console.log(errr.error.msg)
      this.router.navigateByUrl(`/dashboard/doctors`)
    })
  }

  OnSelectedHospitalChange(hospitalId:string){
    this.selectedHospital = this.hospitals.find( resp => hospitalId === resp._id)!;
  }
  
  createDoctor(){
    const { name } = this.doctorForm.value;

    if (this.selectedDoctor) {
      const data = { ...this.doctorForm.value, _id:this.selectedDoctor._id };
      this.doctorService.updateDoctor(data)
      .subscribe(resp => {
        console.log(resp);
        
        Swal.fire('¡Bravo!', 'El médico '+ name +' ha sido actualizado correctamente', 'success');
      });

    }else {
      this.doctorService.createDoctor(this.doctorForm.value)
        .subscribe( (resp:any) => {
          Swal.fire('¡Bravo!', 'El médico ha sido creado correctamente', 'success');
          this.router.navigateByUrl(`/dashboard/doctor/${ resp.doctor._id}`)
        }
      )
    }
}

}
