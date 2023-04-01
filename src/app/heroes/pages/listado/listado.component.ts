
import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles:[]
})

export class ListadoComponent implements OnInit {

heroes:Heroe[] = []


  constructor(private heroesService: HeroesService){}

ngOnInit () {
  this.heroesService.getHeores()
    .subscribe({
      next: heroes => {
        this.heroes = heroes

      },
      error:(error) =>{
        this.heroes = []
        console.log('Error: ', error)
      }
    })
}

}


