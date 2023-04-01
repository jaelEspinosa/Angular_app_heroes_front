import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-heroe-screen',
  templateUrl: './heroe-screen.component.html',
  styles:[

    `
    img{
     width:100%;

    }
     `

  ]
})
export class HeroeScreenComponent {

  constructor (private router: Router) {}

  @Input() heroe!: Heroe

  goBack() {
    this.router.navigate(['/heroes/listado'])
    }
}
