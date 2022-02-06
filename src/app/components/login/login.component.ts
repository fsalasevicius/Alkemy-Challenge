import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroesService } from 'src/app/services/heroes.service';
declare var iziToast:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public usuario : any = {};
  public user : any = {};

  constructor(
    private _heroesService:HeroesService,
    private _router:Router
  ) { }

  ngOnInit(): void {
  }

  func_login(loginForm:any){
    if(loginForm.valid){
      
      this.login(this.user.email,this.user.password);
      
    }else{
      iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'Complete los datos obligatorios para el login.'
      });
    }
  }

  login(email:any,password:any) {
    let data = {
      email: this.user.email,
      password: this.user.password
    }
  

    this._heroesService.login_cliente(data).subscribe(response=>{
      console.log(response.token)
      if(response.token == undefined){
        iziToast.show({
          title: 'ERROR',
          titleColor: '#1a191f',
          color: '#A2B3EB',
          class: 'text-danger',
          position: 'topRight',
          message: response.message
        });
      }else{
        iziToast.show({
          title: 'Bienvenido',
          titleColor: '#1a191f',
          color: '#5b9159',
          class: 'text-info',
          position: 'topRight',
          message: "Accesso Correcto"
        });
        localStorage.setItem('token',response.token);
        this._router.navigate(['/']);
      }
    }, error=>{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#1a191f',
        color: '#faaab8',
        class: 'text-danger',
        position: 'topRight',
        message: "Credenciales de acceso incorrectas"
      });
    });
    
      

  

}

}
