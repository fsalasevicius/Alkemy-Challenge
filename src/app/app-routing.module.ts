import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesDetailComponent } from './components/home/heroes-detail/heroes-detail.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from "./components/guard/auth.guard";
import { PageNoFoundComponent } from './components/page-no-found/page-no-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate:[AuthGuard]},  
  { path: 'login', component: LoginComponent},  
  { path: 'heroes/:id', component: HeroesDetailComponent, canActivate:[AuthGuard]}, 
  { path: '**', component: PageNoFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
