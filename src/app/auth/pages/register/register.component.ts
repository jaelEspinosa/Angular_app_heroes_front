import { Component } from '@angular/core';
import { User } from '../../interfaces/UserInterface';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent {
  private response: any;

  error: string = '';
  success: string = '';

  user: User = {
    nombre:'',
    email:'',
    password: ''
  }


  constructor(private router: Router,
              private authService: AuthService){}


  clearError() {
    this.error = ''
  }

  loading: boolean = false

  register() {
    this.loading = true;
    this.user.email = this.user.email.trim().toLowerCase();

    const validEmail = /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if(this.user.nombre.length < 4) {
      this.error = 'El Nombre es requerido y debe tener 5 letras min.';
      return;
    }

    if(!validEmail.test(this.user.email)){
      this.error = 'El formato del email es inválido'
      return
    }

    this.authService.register(this.user)
       .subscribe({
         next: res => {
          this.response = res
          this.success = this.response.msg;
         },
         error: error =>{
           this.error = error.error.msg
           this.loading = false

         }
       }
       )
       setTimeout(() => {
         this.router.navigate(['./auth/login'])
         this.loading = false
       }, 1500);
  }

}
