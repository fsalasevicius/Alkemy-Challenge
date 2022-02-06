import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
export interface Appearance {
  gender ?:       string;
  race?:         string;
  height?:       string[];
  weight?:       string[];
  "eye-color"?:  string;
  "hair-color"?: string;
}

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  public url : any;
  constructor(
    private _http:HttpClient,
  ) { 
    
    this.url = global.url;
  }
  login_cliente(data:any):Observable<any>{
    return this._http.post('http://challenge-react.alkemy.org',data);
  }

  obtener_heroe(id:any):Observable<any>{    
    return this._http.get(this.url+id);    
  }

  buscar_heroe(parametro:any):Observable<any>{    
    return this._http.get(this.url+'/search/'+parametro);    
  }



}
