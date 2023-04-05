import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroe.interface';
import { environment } from '../../../environments/environment';

import { HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  /* token: string = localStorage.getItem('heroes-token') || ''
  headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token) */

  constructor(private http:HttpClient) { }
  private baseUrl: string = environment.baseUrl

  getHeores():Observable<Heroe[]> {
    const token: string = localStorage.getItem('heroes-token') || ''

    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`, {headers:{'authorization':'Bearer '+ token } })
  }

  getHeroe(id:string):Observable<Heroe>{
    const token: string = localStorage.getItem('heroes-token') || ''
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`, {headers:{'authorization':'Bearer '+ token } })
  }

  getSugerencias( termino: string ): Observable<Heroe[]> {
    const token: string = localStorage.getItem('heroes-token') || ''
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=6`, {headers:{'authorization':'Bearer '+ token } })
  }

  agregarHeroe( heroe: Heroe) :Observable<Heroe> {
    const token: string = localStorage.getItem('heroes-token') || ''
    return this.http.post<Heroe>(`${this.baseUrl}/heroes`, heroe,{headers:{'authorization':'Bearer '+ token } } )
  }

  editarHeroe( heroe: Heroe, id: string):Observable<Heroe> {
    const token: string = localStorage.getItem('heroes-token') || ''
    return this.http.put<Heroe>(`${this.baseUrl}/heroes/${ id }`, heroe, {headers:{'authorization':'Bearer '+ token } })
  }

  eliminarHeroe( id: string ): Observable<any> {
    const token: string = localStorage.getItem('heroes-token') || ''
    return this.http.delete<any>(`${this.baseUrl}/heroes/${ id }`, {headers:{'authorization':'Bearer '+ token } })
  }


}
