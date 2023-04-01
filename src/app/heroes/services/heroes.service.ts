import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroe.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http:HttpClient) { }
  private baseUrl: string = environment.baseUrl

  getHeores():Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`)
  }

  getHeroe(id:string):Observable<Heroe>{
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`)
  }

  getSugerencias( termino: string ): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=6`)
  }

  agregarHeroe( heroe: Heroe) :Observable<Heroe> {
    return this.http.post<Heroe>(`${this.baseUrl}/heroes`, heroe)
  }

  editarHeroe( heroe: Heroe, id: string):Observable<Heroe> {
    return this.http.put<Heroe>(`${this.baseUrl}/heroes/${ id }`, heroe)
  }

  eliminarHeroe( id: string ): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/heroes/${ id }`)
  }


}
