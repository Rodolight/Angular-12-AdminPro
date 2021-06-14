import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchesService } from 'src/app/services/searches.service';

import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  public doctors : Doctor[] = [];
  public hospitals : Hospital[] = [];
  public users : User[] = [];

  constructor( private ActivatedRoute: ActivatedRoute,
               private searchService: SearchesService) { }

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe( ({terms}) => this.globalSearch(terms));
  }

  globalSearch(terms: string){
   this.searchService.globalSearch(terms).subscribe((resp: any) => {
     this.doctors = resp.doctors;
     this.hospitals = resp.hospitals;
     this.users = resp.users;
     
   })
  }

}
