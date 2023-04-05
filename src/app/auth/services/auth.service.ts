import { User } from './../interfaces/UserInterface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient) { }

  private baseUrl: string = environment.baseUrl


  login (user: User) {
    return this.http.post<User>(`${this.baseUrl}/users/login`, user)

  }

  register(user: User) {
    return this.http.post(`${this.baseUrl}/users`, user)
  }
}
