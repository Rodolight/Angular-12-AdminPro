import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router, Event } from '@angular/router';
import { filter,map } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {
  public title : string = "";
  public titleSubs : Subscription;

  constructor(private router: Router) {
    this.titleSubs = this.getRouteArguments().subscribe(({ title }) =>{
      this.title = title;
      document.title = `Adminpro-${ title }`
     });
   }

  ngOnDestroy(): void {
   this.titleSubs.unsubscribe();
  }

  getRouteArguments(){
    return this.router.events.pipe(
      filter( (e:Event): e is ActivationEnd => e instanceof ActivationEnd),
      filter((e:ActivationEnd) => e.snapshot.firstChild === null),
       map((e:ActivationEnd) => e.snapshot.data)
      )
     
  }
    
}
