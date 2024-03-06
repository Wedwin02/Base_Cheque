import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ApiService } from '../../servicios/api/api.service';
import { ProductoI } from '../../models/productoId.interface';
import { FormGroup,FormControl,Validator } from '@angular/forms';
import { ResponseI } from '../../models/response.interface';
import { AlertasService } from '../../servicios/alertas/alertas.service';
@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit{
  constructor(private activaterouter:ActivatedRoute, private router:Router, private api:ApiService, private alerta:AlertasService){

  }
  datosProducts:ProductoI;
  editarForm = new FormGroup({
    ID: new FormControl(''),
    NOMBRE: new FormControl(''),
    CODIGO: new FormControl(''),
    MARCA: new FormControl(''),
    PESO: new FormControl('')
  });
  
  ngOnInit(): void {
    let id = this.activaterouter.snapshot.paramMap.get('id');
    this.api.getproductsId(id).subscribe(data=>{
      this.datosProducts = data[0];
      this.editarForm.setValue({
          'ID': this.datosProducts.ID,
          'NOMBRE': this.datosProducts.NOMBRE,
          'CODIGO': this.datosProducts.CODIGO,
          'MARCA': this.datosProducts.MARCA,
          'PESO': this.datosProducts.PESO   
        });
      })
  }
  postForm(form:any){
    this.api.putProducts(form).subscribe(data=>{
      let respuesta:ResponseI = data;
      if(respuesta.status = "ok"){
        this.alerta.showSuccess('Datos modificados','Hecho');
        this.router.navigate(['dashboard']);
      }else{
        this.alerta.showError(respuesta.result.console.error_msg,'Error');
      }
    })
  }
  eliminar(){
    let datos:any = this.editarForm.value;
    this.api.deleteProducts(datos).subscribe(data=>{
      let respuesta:ResponseI = data;
      if(respuesta.status = "ok"){
        this.alerta.showSuccess('Datos Eliminados','Hecho');
        this.router.navigate(['dashboard']);
      }else{
        this.alerta.showError(respuesta.result.console.error_msg,'Error');
      }
    })
  }

}
