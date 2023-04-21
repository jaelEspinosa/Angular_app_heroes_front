import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanLoad, CanMatch } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PublicGuard } from './auth/guards/public.guard';





const routes : Routes= [
  {
    path:'auth',
    loadChildren: ()=> import ('./auth/auth.module').then(m => m.AuthModule),
    canActivate:[ PublicGuard ],
    canMatch: [ PublicGuard ]

  },
  {
    path:'heroes',
    loadChildren: ()=> import('./heroes/heroes.module').then(m =>m.HeroesModule),
    canActivate:[ AuthGuard ],
    canMatch: [AuthGuard]

  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path:'**',
    redirectTo:'heroes'
    }

]

@NgModule({
  imports:[
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]

})
export class AppRoutingModule { }
