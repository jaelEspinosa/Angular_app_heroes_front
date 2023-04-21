import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles:[]
})


export class HeroeComponent implements OnInit{

  heroe!: Heroe;
  id: string = '';

  constructor(private activatedRoute: ActivatedRoute,
              private heroesService: HeroesService,
              private router: Router) {};



ngOnInit(): void {

  this.activatedRoute.params
  .pipe(
    switchMap(({ id }) => this.heroesService.getHeroe( id ))
  )
  .subscribe(heroe => this.heroe = heroe)

 }
}
