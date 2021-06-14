import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunction():any;

@Component({
  selector: 'app-page',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  public year = new Date().getFullYear()

  constructor( private settingsService: SettingsService,
               private sidebarService: SidebarService ){}

  ngOnInit(): void {
   customInitFunction();
   this.sidebarService.loadMenu();
  }
   


  
  

}
