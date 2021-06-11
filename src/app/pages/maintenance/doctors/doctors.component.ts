import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Doctor } from 'src/app/models/doctor.model';

import { DoctorService } from 'src/app/services/doctor.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchesService } from 'src/app/services/searches.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit {

  public doctors : Doctor[] = [];
  public doctorsTemp : Doctor[] = [];
  public loading : boolean = true;
  private imgSubs!: Subscription;

  constructor( private modalImageService: ModalImageService,
               private doctorService: DoctorService,
               private searchService: SearchesService) { }

  ngOnInit(): void {
    this.loadDoctors(); 
    this.imgSubs = this.modalImageService.newImage
    .pipe(delay(400))
    .subscribe( img => this.loadDoctors());
  }
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }


  loadDoctors() {
    this.loading = true;
    this.doctorService.loadDoctors().subscribe( (doctors: any) => {
      this.loading = false;
      this.doctors = doctors;
      this.doctorsTemp = doctors;
     });
  }

  updateDoctor(doctor: Doctor){
   this.doctorService.updateDoctor(doctor)
   .subscribe( resp => Swal.fire('Actualizado', doctor.name, 'success'));
  }

   deleteDoctor(doctor: Doctor){
     
    return Swal.fire({
      title: '¿Eliminar Médico?',
      html: `¡Está a punto de eliminar a  <strong>${  doctor.name }</strong>!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimínalo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
       this.doctorService.deleteDoctor(doctor._id!).subscribe(resp => {
         this.loadDoctors()
        Swal.fire(
          'Usuario eliminado!',
          `¡${ doctor.name } ha sido eliminado correctamente.!`,
          'success'
        )
       })
      }
    });

   }

   async createDoctor(){
    const result   = await Swal.fire<any> ({
      title: 'Crear Doctor',
      input: 'text',
      inputPlaceholder: 'Ingrese el nombre del Doctor',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false,
    }) 
    
    if( result.isConfirmed && result.value !== null ) {
       
        this.doctorService.createDoctor(result.value).subscribe( (resp:any) => {
          this.doctors.push(resp.Doctor);
        })
    }
   }
 
   showModal(doctor: Doctor) {
    this.modalImageService.openModal('doctors',doctor._id!, doctor.img);
  }

  search(terms: string){

    if(terms.length === 0) {
      return this.doctors = this.doctorsTemp;
    }

     return  this.searchService.search('doctors', terms)
      .subscribe( resp => this.doctors = resp);
    
  }
}
