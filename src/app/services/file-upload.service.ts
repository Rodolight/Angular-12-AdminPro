import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

const base_ul = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  constructor(private userService: UserService) { }

  async updatePicture( fileToUp: File,
                        type : 'users'|'hospitals'|'doctors',
                        id: string ){
   
    try {
      const url = `${ base_ul}/upload/${ type}/${ id }`;
      const formData = new FormData();
      formData.append('image', fileToUp);  

      const resp = await fetch(url, { 
                            method:'PUT', 
                            headers: {'x-token': localStorage.getItem('token') || ''},
                            body: formData
                            });

       const data = await resp.json();  
                         
       if(data.ok) {
          if(this.userService.user.uid == id) {
             this.userService.user.img = data.msg;
             this.userService.newImage.emit(data.msg);
          }
         return data.msg 
      } else {
        console.log(data.msg);
        return false
       }
                            
    } catch (error) {
      console.log(error);
      return false;
      
    }
  }
}
