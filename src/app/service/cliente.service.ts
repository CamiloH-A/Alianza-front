import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url = "api/v1/clientes";

  constructor(
    private httpClient : HttpClient,
    private api: ApiService
    ) { }

  /**
   * Metodo que retorna la lista de los clientes
   * 
   * @returns 
   * 
   */
  getClientList():Observable<Cliente[]>{
    return this.api.get(this.url)
  }

  /**
   * Metodo para guardar un cliente en la base de datos
   * 
   * @param cliente Cuerpo de la peticion
   * @returns 
   * 
   */
  saveClient(cliente:Cliente):Observable<Object>{
    return this.api.post(this.url, cliente)
  }

  /**
   * 
   * @param campo Metodoq que busca un cliente en la base de datos por el campo sharedKey
   * @param sharedKey 
   * @returns 
   */
  searchClientBySharedKey(campo: string, sharedKey: string): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(`${environment.apiUrl}${this.url}/busqueda?sharedKey=${campo}&valor=${sharedKey}`);
  }

  /**
   * 
   * @param campo Metodo que elimina un cliente especifico
   * @returns 
   */
  deleteClient(campo: string): Observable<Object>{
    return this.httpClient.delete(`${environment.apiUrl}${this.url}/${campo}`);
  }

  /**
   * 
   * @param sharedKey Metodo que elimina un cliente especifico
   * @param cliente 
   * @returns 
   */
  editClientBySharedKey(sharedKey: string, cliente: Cliente): Observable<Cliente> {
    return this.httpClient.put<Cliente>(`${environment.apiUrl}${this.url}/${sharedKey}`, cliente);
  }
  
  
}
