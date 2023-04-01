import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-heroe-card',
  templateUrl: './heroe-card.component.html',
  styles:[
       `
    mat-card{
      margin-top:10px;
       }

    .photo{
      margin:10px 10px;
      max-width:600px;
      max-height:500px;

      border-radius:10px;
      overflow-y:hidden;

    }

    img{
      width:100%;
    }
    `

  ]
})
export class HeroeCardComponent {
 @Input() heroe!: Heroe;
}
