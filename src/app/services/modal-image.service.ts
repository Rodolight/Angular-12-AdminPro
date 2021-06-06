import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _hideModal = true;
  public type! : 'users'|'hospitals'|'doctors';
  public id! : string;
  public img!: string;
  public newImage : EventEmitter<string> = new EventEmitter<string>();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
  constructor() { }

  get hideModal() {
    return this._hideModal; 
  }

  openModal(type: 'users'|'hospitals'|'doctors', id: string, img = 'no-image') {
    this._hideModal = false;
    this.type = type;
    this.id = id;
    if(img.includes('https')) 
       this.img = img;
    else
       this.img = `${base_url}/upload/${type}/${ img}`

  }

  closeModal(){
    this._hideModal = true;
  }

  
}
