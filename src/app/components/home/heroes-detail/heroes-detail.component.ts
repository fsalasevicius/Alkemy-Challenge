import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-heroes-detail',
  templateUrl: './heroes-detail.component.html',
  styleUrls: ['./heroes-detail.component.css']
})
export class HeroesDetailComponent implements OnInit {

  public heroes  : any = {};
  public detail  : any = {};
  public id:any;

  public intelligence:any = 0;
  public speed:any = 0;
  public strength:any = 0;
  public durability:any = 0;
  public combat:any = 0;
  public power:any = 0;

  
  constructor(
    private _heroesService:HeroesService,
    private _router:Router,
    private _route:ActivatedRoute) { 
      
  }
  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
      }
    )
    this._heroesService.obtener_heroe(this.id).subscribe(response=>{
      this.heroes = [response]

      
      this.intelligence = this.detail.powerstats.intelligence;
      this.speed = this.detail.powerstats.speed;
      this.strength = this.detail.powerstats.strength;
      this.durability = this.detail.powerstats.durability;
      this.combat = this.detail.powerstats.combat;
      this.power = this.detail.powerstats.power;
      console.log(this.detail)
      console.log(this.strength)
    })
  }
}
