import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { AbstractControl, AbstractControlOptions, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css'
  ]
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: ['Ramon', Validators.required],
    email: ['test100@test.com', [Validators.required, 
                                 Validators.email, 
                                 Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]
           ],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terms: [ true, Validators.required],
          }, 
    { 
      validators: this.samePasswords('password', 'password2')
    } as AbstractControlOptions);

  constructor( private fb: FormBuilder,
               private userservice: UserService,
               private router: Router) { }

  createUser(){
    this.formSubmitted = true;
   
    if (this.registerForm.invalid) return;

    // Realiza el posteo
    this.userservice.createUser(this.registerForm.value)
    .subscribe(resp =>{
     console.log('Usuario creado');
     this.router.navigateByUrl('/');
    }, (err) => Swal.fire('Error',err.error.msg,'error'));

  }

  invalidField(field: string):boolean{
  return (this.registerForm.get(field)?.invalid && this.formSubmitted ) ? true : false;
  };

  invalidPassword(){
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    return ((pass1 !== pass2) && this.formSubmitted) ? true : false;
  }

  invalidTerms(){
    return !this.registerForm.get('terms')?.value && this.formSubmitted;
  }

  samePasswords(pass1Name: string, pass2Name: string) : ValidationErrors | null {
    
    return (group: AbstractControl)  => {
      const pass1Control = group.get(pass1Name);
      const pass2Control = group.get(pass2Name);

      (pass1Control?.value === pass2Control?.value)? pass2Control?.setErrors(null) :pass2Control?.setErrors({notEqual: true})
  
    };
  }
}

