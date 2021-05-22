import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';


@Component({
  selector: 'app-increments',
  templateUrl: './increments.component.html',
  styleUrls: ['./increments.component.css']
})
export class IncrementsComponent implements OnInit {

  ngOnInit() {
    this.btnClass = `btn ${this.btnClass } h40`
  }

  @Input('value') progress : number = 40;
  @Input() btnClass = "btn-primary"

  @Output() outputValue : EventEmitter<number> = new EventEmitter();
  @Output() errorValue : EventEmitter<number> = new EventEmitter();

    error: number = 0;

  changeValue(value: number) {
      this.error = value;
    if( this.progress >= 100 && value >= 0) {
      this.error = 100
      this.outputValue.emit(100)
      this.errorValue.emit(this.error)
      return this.progress = 100
    }

    if(this.progress <= 0 && value < 0) {
      this.error = 0
      this.outputValue.emit(0)
      this.errorValue.emit(this.error)
      return this.progress = 0
    }
    
    this.progress = this.progress + value
    this.error = this.progress
    this.outputValue.emit(this.progress)
    this.errorValue.emit(this.error)
    return this.progress 
   
  }

  onChange(newValue: number){
    if(newValue >=100 ){
       this.progress = 100;
       this.error = 101;
    }
    else if(newValue <= 0){
       this.progress = 0;
       this.error = -1;
    }
    else {
      this.progress = newValue;
      this.error = 0;
    }

    this.outputValue.emit(this.progress)
    this.errorValue.emit(this.error)
  }

}
