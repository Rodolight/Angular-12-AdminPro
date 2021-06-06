import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFunction():any;

@Component({
  selector: 'app-page',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  public year = new Date().getFullYear()

  constructor( private settingsService: SettingsService ){}

  ngOnInit(): void {
   customInitFunction();
  
  }
   


  
  

}
