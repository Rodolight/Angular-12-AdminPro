import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  menuItems : any;

  constructor(private sidebarService: SidebarService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.menuItems = this.sidebarService.menu;
  }

  logout(){
    this.userService.logout();
  }

}
