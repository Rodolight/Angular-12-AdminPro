import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrls: ['./promises.component.css']
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsers().then(usuarios => {
      console.log(usuarios);
      
    })
    // const promise = new Promise(  (resolve, reject) =>{
    //   if(false) {
    //     resolve('Hola Mundo')
    //   }else{
    //     reject('Algo salió mal')
    //   }
    // });

    // promise.then( (message) =>{
    //   console.log(message);
      
    // }).catch(error=> console.log('Error en la promesa ', error))

    // console.log(" Fin del init");
  }

    getUsers() {

      return new Promise( resolve => {

      fetch('https://reqres.in/api/users')
      .then( resp => resp.json() )
      .then( body => resolve( body.data ));

      });
    }
}
