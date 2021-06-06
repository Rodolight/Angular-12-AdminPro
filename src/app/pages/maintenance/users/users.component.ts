import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';

import { User } from '../../../models/user.model';

import { UserService } from '../../../services/user.service';
import { SearchesService } from 'src/app/services/searches.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit , OnDestroy{
  
  public totalUsers = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public fromValue = 0;
  public itemPerPage = 4;
  public page = 1;
  public totalPage = 0;
  public loading : boolean = true;
  public imgSubs! : Subscription;

  constructor(private userService: UserService,
              private searcService: SearchesService,
              private modalImageService: ModalImageService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void  {
   this.getUsers();
   this.totalPage = this.itemPerPage;
   this.imgSubs = this.modalImageService.newImage
    .pipe(delay(100))
    .subscribe(resp => this.getUsers()
    );
  }

  getUsers(){
    this.loading = true;
    this.userService.loadUsers(this.fromValue,this.itemPerPage).subscribe(({total, users}) => {
      this.totalUsers = total;
      this.users = users;
      this.usersTemp = users;
      this.loading = false;
    });
   
  }

  changePage(initValue: number){
   this.fromValue += initValue;
   this.totalPage += initValue;
  
   (initValue >= 0) ? this.page += 1 : this.page -=1
   
   this.getUsers()
  }

  search(terms: string) {
    
    if(terms.length === 0) {
      return this.users = this.usersTemp;
    }

     return  this.searcService.search('users', terms)
      .subscribe( resp => {
         this.users = resp
         this.totalUsers = resp.length
      });
    
  }

  deleteUser(user:User){
    if(user.uid === this.userService.uid) return Swal.fire('info', 'Prohibido eliminarse a si mismo.','info')
   
    return Swal.fire({
      title: '¿Eliminar Usuario?',
      html: `¡Está a punto de eliminar a  <strong>${  user.name }</strong>!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimínalo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
       this.userService.deleteUser(user).subscribe(resp => {
         this.getUsers();
        Swal.fire(
          'Usuario eliminado!',
          `¡${ user.name } ha sido eliinado correctamente.!`,
          'success'
        )
       })
      }
    })
    
  }

  changeUserRole(user:User){
    this.userService.updateUserRole(user)
    .subscribe(resp => {
      console.log(resp);
      
    })
    
  }

  showModal(user:User) {
    this.modalImageService.openModal('users',user.uid!, user.img);
  }
}
