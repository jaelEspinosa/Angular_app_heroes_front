import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles:[
    `
    .heroe-selected{
      margin:auto;
      width: 80vw;
      height: calc(100vh - 260px);
      overflow-y:hidden;

    }
    @media(max-width:600px){
      .heroe-selected{
        overflow-y: scroll;
      }
    }
    `
  ]
})
export class BuscarComponent {

  constructor( private heroesService: HeroesService){}

termino: string = '';
heroes: Heroe[] = [];
heroeSeleccionado: Heroe | undefined;



buscando() {

 this.heroesService.getSugerencias(this.termino.trim())
 .subscribe(heroes => this.heroes = heroes)
}

opcionSeleccionada( event:MatAutocompleteSelectedEvent ) {

  if ( !event.option.value ) {
    this.heroeSeleccionado = undefined;
    return
  }

 const heroe:Heroe = event.option.value;


 this.termino = heroe.superhero
 this.heroesService.getHeroe( heroe._id! )
   .subscribe ( heroe => this.heroeSeleccionado = heroe )



}

}
