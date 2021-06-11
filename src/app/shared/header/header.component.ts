import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit, OnDestroy  {
  public user! : User
  public imgSub! : Subscription;

  constructor( private userService: UserService) { 
    this.user = userService.user
  }

  ngOnDestroy(): void {
    this.imgSub.unsubscribe();
  }
  ngOnInit(): void {
   this.imgSub = this.userService.newImage
                  .subscribe(resp => this.user = this.userService.user);
  }

   logout(){
     this.userService.logout()
   }

}
