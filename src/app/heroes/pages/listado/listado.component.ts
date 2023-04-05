
import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles:[]
})

export class ListadoComponent implements OnInit {

heroes:Heroe[] = []


  constructor(private heroesService: HeroesService,
              private router: Router
              ){}

ngOnInit () {
  this.heroesService.getHeores()
    .subscribe({
      next: heroes => {
        this.heroes = heroes

      },
      error:(error) =>{
        this.heroes = []
        console.log(error.error.msg)
        if(error.error.msg.includes('Token')){
          this.router.navigate(['./auth/login'])
        }
      }
    })
}

}


