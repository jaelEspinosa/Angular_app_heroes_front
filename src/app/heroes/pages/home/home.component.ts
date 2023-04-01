import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles:[
    `
    .list-item-mi{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
}
   .container{
     margin: 10px;
   }
    `
  ]
})
export class HomeComponent {

}
