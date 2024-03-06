import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup ,Validator} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../servicios/api/api.service';
import { ResponseI } from '../../models/response.interface';
import { AlertasService } from '../../servicios/alertas/alertas.service';
@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.css'
})
export class NuevoComponent implements OnInit {
  nuevoForm= new FormGroup({
    NOMBRE: new FormControl(''),
    CODIGO: new FormControl(''),
    MARCA: new FormControl(''),
    PESO: new FormControl('')
  
  });
  ngOnInit(): void {

   
  }


  constructor(private api:ApiService, private router:Router,private alerta:AlertasService){}
  postForm(form:any){
    this.api.insertProducts(form).subscribe(data=>{
      let respuesta:ResponseI = data;
      if(respuesta.status = "ok"){
        this.alerta.showSuccess('Datos ingresados con exito','Hecho');
        this.router.navigate(['dashboard']);
      }else{
        this.alerta.showError(respuesta.result.console.error_msg,'Error');
      }
  })
}
}

