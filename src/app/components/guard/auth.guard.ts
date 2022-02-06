import { Injectable } from '@angular/core';
import { CanActivate,Router} from '@angular/router';
import { LoginService } from '../../services/login.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    private _router:Router,
    private _loginService:LoginService
  ){

  }
  
  canActivate():any{
    let access:any = this._loginService.isAuthenticate();

    if(!access){
      this._router.navigate(['/login']);
    }
    return true;
  }
  
}
