import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles:[
    `
    .form{
      margin-top:10vh;
    }
    img{
      max-width:100%;
      max-height: calc(100vh - 300px)
    }

    @media(max-width:576px){
      img{
        width:100%;
        max-height: 100%;
      }
    }
    `

  ]
})
export class AgregarComponent implements OnInit {

  ngOnInit(): void {

    if(!this.router.url.includes('editar') ) return;


    this.activatedRoute.params
    .pipe(
      switchMap(({ id })=> this.heroesService.getHeroe( id ))
    )
     .subscribe( heroe => this.heroe = heroe );


  }


  constructor (private heroesService: HeroesService,
               private activatedRoute: ActivatedRoute,
               private router: Router
               ){}

  publishers = [
    {
      id:'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id:'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]
heroe: Heroe = {
  superhero: '',
  alter_ego: '',
  characters: '',
  first_appearance: '',
  publisher: Publisher.DCComics,
  alt_img:''
}


saved: boolean = false;
isValidForm: boolean = true;

guardar() {
  if (this.heroe.superhero.trim().length === 0 ||
      this.heroe.first_appearance.trim().length === 0 ||
      this.heroe.alter_ego.trim().length === 0 ||
      this.heroe.characters.trim().length === 0 ||
      this.heroe.alter_ego.trim().length === 0 ||
      this.heroe.alt_img?.trim().length=== 0 )
      {
      this.isValidForm = false
      setTimeout(() => {
        this.isValidForm = true
      }, 2000);
      return;
     }
if(!this.heroe._id){
  this.heroesService.agregarHeroe( this.heroe ).subscribe(heroe => this.heroe = heroe)
  this.saved = true
}else{
 this.heroesService.editarHeroe( this.heroe, this.heroe._id ).subscribe(heroe => this.heroe = heroe)
 this.saved = true
}
setTimeout(() => {
  this.saved=false
  this.router.navigate([`/heroes/${this.heroe._id}`])
}, 2500);
}
delete(){
  this.heroesService.eliminarHeroe(this.heroe._id!)
  .subscribe(resp => {
   this.router.navigate(['/heroes'])

  })
}

}
