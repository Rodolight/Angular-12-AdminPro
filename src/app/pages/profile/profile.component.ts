import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserService } from '../../services/user.service';
import { FileUploadService } from '../../services/file-upload.service';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public profileForm! : FormGroup;
  public user! : User;
  public imageToUp! : File;
  public imageTemp: any = null;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private fileUploadService: FileUploadService) { 
                this.user = this.userService.user;
              }
  
  ngOnInit(): void {
   this.profileForm  = this.fb.group({
    name : [this.user.name,Validators.required],
    email: [this.user.email, [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
   });

  }

  updateProfile(){
    
    this.userService.updateProfile(this.profileForm.value).subscribe( () =>{
  
     const { name, email } = this.profileForm.value
     this.user.name = name,
     this.user.email = email
      Swal.fire('¡Que bueno!','Los cambios han sido almacenados exitosamente.', 'success');
    }, (err) =>{
      Swal.fire('Oops!', err.error.msg,'error')
      
    })
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
    this.fileUploadService.updatePicture(this.imageToUp,'users', this.user.uid!)
      .then(img => {
        this.user.img = img;
        Swal.fire('!Que bueno!','Tu foto ha sido actualizada correctamente.', 'success')
       }
      );
  }
}
