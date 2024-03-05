import { Component,OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { Router } from '@angular/router';
import { ListaProductoI } from '../../models/listaProducto.interface';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  product:ListaProductoI[];

  constructor(private api:ApiService, private router:Router){}
  
  ngOnInit():void{

    //Que se cargue cuando inicie
    this.api.getAllProducts(1).subscribe(data=>{
     this.product = data;
    });

  }
  editarProducts(id){
    this.router.navigate(['editar',id]);
   }
  
  nuevoProducts(){
    this.router.navigate(['nuevo']);
   }
  

  
}
