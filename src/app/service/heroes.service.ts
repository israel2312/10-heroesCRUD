import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import {map, delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = "https://login-angular-d1ed9.firebaseio.com";
  constructor(private http:HttpClient) { }


  crearHeroe(heroe: HeroeModel){  

    return this.http.post(`${this.url}/heroes.json`, heroe)
    .pipe(map((res:any) =>{
        heroe.id = res.name;
       return heroe;
    }))
  }

  actualizar(heroe: HeroeModel){
    
    const heroeTem ={
      ...heroe
    };

    delete heroeTem.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTem);

  }

  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`)
    .pipe(map(this.crearArreglo), delay(1500))
  }

  getHeroe(id:string){
     return this.http.get(`${this.url}/heroes/${id}.json`)
  }


  borrarHeroe(id:string){

    return this.http.delete(`${this.url}/heroes/${id}.json`)

  }



  crearArreglo(heroesOb: object){

    const heroes:HeroeModel[] = []; // creamos un array de tipo heroe model

     Object.keys(heroesOb).forEach(key=>{ 

       const heroe:HeroeModel = heroesOb[key];

       heroe.id = key;

       heroes.push(heroe);


     })

     return heroes;

  }


}
