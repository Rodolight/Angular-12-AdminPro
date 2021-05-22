import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [
    './progress.component.css'
  ]
})
export class ProgressComponent {

 progress1 = 25;
 progress2 = 35;

 getPorcent1() {
   return `${ this.progress1 }%`
 }

 getPorcent2(){
  return `${ this.progress2 }%`
 }

}
