import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphic1',
  templateUrl: './graphic1.component.html',
  styles: [
  ]
})
export class Graphic1Component implements OnInit {

  //  // Doughnut
    public Labels1 = ['Pan', 'Regrescos', 'Tacos'];
    public data1= [[10, 20, 40],]
   

  constructor() { }

  ngOnInit(): void {
  }

    // events
    // public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //   console.log(event, active);
    // }
  
    // public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //   console.log(event, active);
    // }
  
  

}
