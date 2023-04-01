import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroe.interface';

@Pipe({
  name: 'image'
})

export class imagePipe implements PipeTransform {
  transform(heroe: Heroe):string {

   if (!heroe._id ) return `assets/no-image.png`

   if (!heroe.alt_img){

     return `assets/heroes/${heroe.publisher.substring(0,2).toLowerCase()}-${heroe.superhero.split(' ')[0].toLowerCase().trim()}.jpg`
   }else{
     return heroe.alt_img
   }

  }
}
