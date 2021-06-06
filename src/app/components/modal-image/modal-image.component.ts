import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {
 
  public imageToUp! : File;
  public imageTemp: any = null;

  constructor( public modalImageService: ModalImageService,
               private fileUploadService: FileUploadService) { }

  ngOnInit(): void {

  }
  

  closeModal(){
    this.imageTemp = null;
    this.modalImageService.closeModal();
  }

  changePicture(event: Event) {
    const target = event.target as HTMLInputElement
    const files = target.files as FileList
   
    if(!files[0]) return this.imageTemp = null;

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => this.imageTemp = reader.result;

    return  this.imageToUp = files[0];
  }

   uploadPicture(){
    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

     this.fileUploadService.updatePicture(this.imageToUp,type, id)
      .then(img => {
        Swal.fire('!Que bueno!','La foto ha sido actualizada correctamente.', 'success')
        this.closeModal()
        this.modalImageService.newImage.emit(img);
      }
      );
  }

}
