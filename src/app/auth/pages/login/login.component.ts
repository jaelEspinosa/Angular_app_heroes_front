import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/UserInterface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {


  ngOnInit(): void {

  }

  private response: any;

  error: string = '';

  user: User = {
    nombre:'',
    email:'',
    password: ''
  }


  constructor(private router: Router,
              private authService: AuthService){}

  loading: boolean = false


  login() {
    this.user.email=this.user.email.trim().toLowerCase()
    this.loading = true
    this.authService.login(this.user)
       .subscribe({
         next: res => {
          this.response = res

          localStorage.setItem('heroes-token', this.response.token)
          localStorage.setItem('heroes-user', this.response.nombre)
          this.loading = false
          this.router.navigate(['./heroes'])

         },

         error: error =>{
           this.error = error.error.msg
           this.loading = false
         }
       }
       )
  }

}
