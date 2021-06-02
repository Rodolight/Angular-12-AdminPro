import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
      './login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, 
                                 Validators.email, 
                                 Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]
           ],
    password: ['', Validators.required],
    remember: [false]
          });
      

  constructor(private router: Router,
              private fb: FormBuilder,
              private userService: UserService,
              private zone: NgZone) { 

                if(localStorage.getItem('email')) 
                   this.loginForm.get('remember')?.setValue(true);
              }


  ngOnInit(): void {
   this.renderButton();
  }


  login(){

   this.userService.login(this.loginForm.value).subscribe( resp =>{

    if(this.loginForm.get('remember')?.value){
      localStorage.setItem('email', this.loginForm.get('email')?.value);
    }else{
      localStorage.removeItem('email');
    }
     // navegar hacia el dashboard
     this.router.navigateByUrl('/');
     
   }, (err)=> Swal.fire('Error', err.error.msg,'error') );
     
  
    
  }



  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': false,
      'theme': 'dark'
    });
    this.startApp();
  }

  async startApp () {
      await this.userService.googleInit();
      this.auth2 = this.userService.auth2;

      this.attachSignin(document.getElementById('my-signin2'));
  };
  
  attachSignin(element:any) {
    this.auth2.attachClickHandler(element, {},
        (googleUser: any) =>{
          var id_token = googleUser.getAuthResponse().id_token;
          this.userService.loginGoogle(id_token).subscribe(resp =>{
              // navegar hacia el dashboard
              this.zone.run(() => this.router.navigateByUrl('/'));
              
          });
          
        }, (error:any) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
