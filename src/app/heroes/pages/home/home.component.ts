import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/UserInterface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles:[
    `
    .list-item-mi{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 10px;
    }
    .container{
      margin: 10px;
    }
    `
  ]
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
    this.user = localStorage.getItem('heroes-user') || ''
  }

  user!: string;

 /* get user (){
  console.log(this.authService.user.nombre)
  return this.authService.user
 } */

  constructor(private router: Router,
              private authService: AuthService){}


  logOut() {
    localStorage.removeItem('heroes-user')
    localStorage.removeItem('heroes-token')
    this.router.navigate(['./auth/login'])
  }

}
