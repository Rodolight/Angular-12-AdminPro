import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: 'users'|'hospitals'|'doctors'): string {
    if(!img)
       img = `${base_url}/upload/${ type }/no-image`
    else  if(img.includes('https')) 
      img = img; 
    else 
       img = `${base_url}/upload/${type}/${ img}`

    return img  

  }

}
