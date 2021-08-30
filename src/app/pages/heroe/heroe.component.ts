import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/service/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {


  heroe = new HeroeModel();

  constructor(private heroesService: HeroesService,
              private route:ActivatedRoute   
    ) { }

  ngOnInit(): void {
     const id = this.route.snapshot.paramMap.get('id'); //obtenemos el id de la url
     
     if(id != 'nuevo'){
        this.heroesService.getHeroe(id)
          .subscribe((resp: HeroeModel)=>{
             this.heroe = resp;
             this.heroe.id = id;
          })
     }else{
       console.log('is a new register');
     }
  }

  guardar(form:NgForm){

    if(form.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ocurrio un error',
        
      })
     return;

    }


    Swal.fire({
      icon: 'info',
      title: 'ESPERE...',
      text: 'Guardando información',
      allowOutsideClick: false
      
    })
    Swal.showLoading();


    let peticion: Observable<any>;

    if(this.heroe.id){
      peticion = this.heroesService.actualizar(this.heroe);
      
    }else{
      peticion = this.heroesService.crearHeroe(this.heroe);
      
    }

    peticion.subscribe(res =>{
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizo correctamente',
        icon:'success'
      })
    })
    

}
}
