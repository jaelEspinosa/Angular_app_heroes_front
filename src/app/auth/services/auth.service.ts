import { User } from './../interfaces/UserInterface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, catchError, map, of, tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!:User

  constructor( private http: HttpClient) { }

  private baseUrl: string = environment.baseUrl


  login (user: User) {
    return this.http.post<User>(`${this.baseUrl}/users/login`, user)

  }

  register(user: User) {
    return this.http.post(`${this.baseUrl}/users`, user)
  }

  checkAuthentication(): Observable<boolean> {
    const token = localStorage.getItem('heroes-token')
    if(!token) return of(false)
    return this.http.get<User>(`${this.baseUrl}/users/perfil`,{headers:{'authorization':'Bearer '+ token } })
    .pipe(
      tap( user => this.user = user),
      map( user => !!user),
      catchError( err => of(false))
    )

  }

}
function Of(arg0: boolean) {
  throw new Error('Function not implemented.');
}

