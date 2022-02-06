import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroesService } from 'src/app/services/heroes.service';
declare var iziToast: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public heroes: any = {};
  public team: any = [];
  public selection: any = [];

  public dup: boolean = false;
  public statics = {
    powerstats: {
      intelligence: 0,
      speed: 0,
      strength: 0,
      durability: 0,
      combat: 0,
      power: 0
    },
    icon: '',
    title: '',
    good: 0,
    evil: 0
  };

  public detailHero: any = [];
  public parametro = '';
  public id: any;

  constructor(
    private _heroesService: HeroesService,
    private _router: Router) {

  }

  ngOnInit(): void {
    this.team = JSON.parse(localStorage.getItem('Equipo') || '')
  }

  buscar(parametro: any) {
    this._heroesService.buscar_heroe(this.parametro).subscribe(response => {

      this.heroes = response.results;

    }, error => {
      console.log(error)
    });
  }



  addTeam(id: any) {
    this._heroesService.obtener_heroe(id).subscribe(response => {

      this.selection = response;

      for (const k in this.team) {
        if (this.team[k].id == id) {
          this.dup = true;
        }
      }
      if (!this.dup) {
        if (this.team.length > 5) {
          iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'El equipo ya se encuentra completo.'
          });
        } else {
          if (this.selection.biography.alignment === 'good') {
            this.statics.good += 1
          }
          if (this.selection.biography.alignment === 'bad') {
            this.statics.evil += 1
          }

          if (this.statics.good > 3) {
            this.statics.good -= 1
            iziToast.show({
              title: 'ERROR',
              titleColor: '#FF0000',
              color: '#FFF',
              class: 'text-danger',
              position: 'topRight',
              message: 'El equipo no puede tener mas de 3 heroes buenos.'
            });
          } else if (this.statics.evil > 3) {
            this.statics.evil -= 1
            iziToast.show({
              title: 'ERROR',
              titleColor: '#FF0000',
              color: '#FFF',
              class: 'text-danger',
              position: 'topRight',
              message: 'El equipo no puede tener mas de 3 heroes malos.'
            });
          } else {

            if (this.selection.powerstats.intelligence === 'null') {
              this.statics.powerstats.intelligence += 0;
            } else {
              this.statics.powerstats.intelligence += Number(this.selection.powerstats.intelligence);
            }

            if (this.selection.powerstats.strength === 'null') {
              this.selection.powerstats.strength += 0;
            } else {
              this.statics.powerstats.strength += Number(this.selection.powerstats.strength);
            }

            if (this.selection.powerstats.speed === 'null') {
              this.selection.powerstats.speed += 0;
            } else {
              this.statics.powerstats.speed += Number(this.selection.powerstats.speed);
            }

            if (this.selection.powerstats.durability === 'null') {
              this.selection.powerstats.durability += 0;
            } else {
              this.statics.powerstats.durability += Number(this.selection.powerstats.durability);
            }

            if (this.selection.powerstats.power === 'null') {
              this.statics.powerstats.power += 0;
            } else {
              this.statics.powerstats.power += Number(this.selection.powerstats.power);
            }

            if (this.selection.powerstats.combat === 'null') {
              this.statics.powerstats.combat += 0;
            } else {
              this.statics.powerstats.combat += Number(this.selection.powerstats.combat);
            }
            this.team.push(this.selection)
            localStorage.setItem('Equipo', JSON.stringify(this.team))
            localStorage.setItem('Stats', JSON.stringify(this.statics))


            if (this.team.length === 6) {
              var max = Object.entries(this.statics.powerstats).reduce(function (prev, curr) {
                return prev[1] > curr[1] ? prev : curr;
              });
              this.statics.icon = 'icon-' + max[0];
              this.statics.title = max[0].toLocaleUpperCase();
            }
            console.log(this.team)
            console.log(this.statics)

          }

        }

      } else {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'El heroe ya ha sido seleccionado.'
        });

        this.dup = false;
      }



    })

  }

  delTeam(id: any) {
    this._heroesService.obtener_heroe(id).subscribe(response => {
      this.selection = response;
      let newArray: any[] = this.team.filter((bus: { id: any; }) => bus.id !== id)
      this.team = newArray;
      localStorage.setItem('Equipo', JSON.stringify(this.team))

      if (this.selection.powerstats.intelligence === 'null') {
        this.statics.powerstats.intelligence += 0;
      } else {
        this.statics.powerstats.intelligence -= Number(this.selection.powerstats.intelligence);
      }

      if (this.selection.powerstats.strength === 'null') {
        this.selection.powerstats.strength += 0;
      } else {
        this.statics.powerstats.strength -= Number(this.selection.powerstats.strength);
      }

      if (this.selection.powerstats.speed === 'null') {
        this.selection.powerstats.speed += 0;
      } else {
        this.statics.powerstats.speed -= Number(this.selection.powerstats.speed);
      }

      if (this.selection.powerstats.durability === 'null') {
        this.selection.powerstats.durability += 0;
      } else {
        this.statics.powerstats.durability -= Number(this.selection.powerstats.durability);
      }

      if (this.selection.powerstats.power === 'null') {
        this.statics.powerstats.power += 0;
      } else {
        this.statics.powerstats.power -= Number(this.selection.powerstats.power);
      }

      if (this.selection.powerstats.combat === 'null') {
        this.statics.powerstats.combat -= 0;
      } else {
        this.statics.powerstats.combat -= Number(this.selection.powerstats.combat);
      }
      if (this.selection.biography.alignment === 'good') {
        this.statics.good -= 1
      }
      if (this.selection.biography.alignment === 'bad') {
        this.statics.evil -= 1
      }
      this.statics.icon = '';
    })

  }


}
