import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Hospital } from '../../../models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchesService } from 'src/app/services/searches.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styles: [
  ]
})
export class HospitalComponent implements OnInit, OnDestroy {
  
  public hospitals : Hospital[] = [];
  public hospitalsTemp : Hospital[] = [];
  public loading : boolean = true;
  private imgSubs!: Subscription;

  constructor(private horpitalService: HospitalService,
              private modalImageService: ModalImageService,
              private searcService: SearchesService) { }
  

  ngOnInit(): void {
    this.loadHospitals(); 
    this.imgSubs = this.modalImageService.newImage
    .pipe(delay(100))
    .subscribe( img => this.loadHospitals());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }


  loadHospitals() {
    this.loading = true;
    this.horpitalService.loadHospitals().subscribe(hospitals => {
      this.loading = false;
      this.hospitals = hospitals;
      this.hospitalsTemp = hospitals;
     });
  }

  updateHospital(hospital: Hospital){
   this.horpitalService.updateHospital(hospital._id!, hospital.name)
   .subscribe( resp => Swal.fire('Actualizado', hospital.name, 'success'));
  }

   deleteHospital(hospital: Hospital){
    this.horpitalService.deleteHospital(hospital._id!)
    .subscribe( resp => {
      this.loadHospitals();
      Swal.fire('Eliminado', hospital.name, 'success');
    });
   }

   async createHospital(){
    const result  = await Swal.fire<string> ({
      title: 'Crear hospital',
      input: 'text',
      inputPlaceholder: 'Ingrese el nombre del hospital',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false,
    }) 
    
    if( result.isConfirmed && result.value!.trim().length > 0) {
        this.horpitalService.createHospital(result.value!).subscribe( (resp:any) => {
          this.hospitals.push(resp.hospital);
        })
    }
   }
 
   showModal(hospital:Hospital) {
    this.modalImageService.openModal('hospitals',hospital._id!, hospital.img);
  }

  search(terms: string){

    if(terms.length === 0) {
      return this.hospitals = this.hospitalsTemp;
    }

     return  this.searcService.search('hospitals', terms)
      .subscribe( resp => this.hospitals = resp);
    
  }
}
