import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HomeComponent } from './pages/home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material/material.module';
import { HeroesRoutingModule } from './heroes-routing.module';

import { ListadoComponent } from './pages/listado/listado.component';
import { HeroeCardComponent } from './components/heroe-card/heroe-card.component';
import { imagePipe } from './pipes/imagen.pipe';
import { HeroeScreenComponent } from './components/heroe-screen/heroe-screen.component';
import { ConfirmarComponent } from './components/confirmar/confirmar.component';



@NgModule({
  declarations: [
      //components
     AgregarComponent,
     BuscarComponent,
     HeroeCardComponent,
     HeroeComponent,
     HomeComponent,
     ListadoComponent,
     HeroeScreenComponent,
     ConfirmarComponent,

     //pipes
      imagePipe,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    HeroesRoutingModule,
    MaterialModule,


  ]
})
export class HeroesModule { }
