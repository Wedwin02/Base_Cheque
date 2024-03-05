import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListaProductoI } from '../../models/listaProducto.interface';
import { Observable } from 'rxjs';
import { ProductoI } from '../../models/productoId.interface';
import { ResponseI } from '../../models/response.interface';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string ="http://localhost/base_api/";

  constructor( private http:HttpClient) { }

  //get all
  getAllProducts(page:number):Observable<ListaProductoI[]>{
    let direccion = this.url + "productos?page=$" + page;
    return this.http.get<ListaProductoI[]>(direccion);
  }

  //get id
  getproductsId(id):Observable<ProductoI>{
    let direccion = this.url +"productos?id=" + id;
    return this.http.get<ProductoI>(direccion);
  }
  // Update 
  putProducts(form:ProductoI):Observable<ResponseI>{
    let direccion = this.url +"productos";
    return this.http.put<ResponseI>(direccion,form);
  }

  // delete
  deleteProducts(form:ProductoI):Observable<ResponseI>{
    let direccion = this.url +"productos";
    let Options = {
      headers: new HttpHeaders({
        'Conten-type':'application/json'
      }),
      body:form
    }
    return this.http.delete<ResponseI>(direccion,Options);
  }

  // Insert 
  insertProducts(form:ProductoI):Observable<ResponseI>{
    let direccion = this.url +"productos";
    return this.http.post<ResponseI>(direccion,form);
  }
}
