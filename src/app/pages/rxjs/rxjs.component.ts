import { Component, OnDestroy } from '@angular/core';
import { Observable , interval, Subscription} from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnDestroy {

  intervalUnSubs? : Subscription;

  constructor() { 
   
   this.intervalUnSubs = this.returnInterval().subscribe(console.log);

    // this.returnObservable().pipe( retry(1)).subscribe(
    //   valor => console.log('Subs:', valor),
    //   error => console.warn('Error:', error),
    //   ()=> console.info(' Obs terminado')
    // );

  }
  ngOnDestroy(): void {
  this.intervalUnSubs?.unsubscribe()
  }
    
   returnInterval(): Observable<Number>{
     //take(10)
    return interval(100).pipe( map(valor => valor + 1),filter( valor => (valor % 2 === 0)? true : false) )

   }

   returnObservable() : Observable<Number>{
    let i = -1;
    return new Observable<Number>(observer => {
    

      const intervalo = setInterval( () => {
        i++;
        observer.next(i);
      
        if( i == 4){
          clearInterval(intervalo)
          observer.complete();
        }

        if(i == 2){
          observer.error('i llegó al valor 2')
        }
         
       }, 100)
    });


   }
 

}


