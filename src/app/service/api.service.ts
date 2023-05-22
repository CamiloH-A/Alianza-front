import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private setHeader(){
    return {
      headers: new HttpHeaders
    }
  }

  /**
   * 
   * @param url EndPoint del servicio
   * @returns 
   * 
   */
  public get(url:string):Observable<any>{
    return this.http.get<any>(environment.apiUrl + url);
  }

  /**
   * Raliza una invocacion de un metodo post al api de servicios
   * @param url EndPoint del servicio
   * @param body Cuerpo de la peticion
   * @returns 
   * 
   */
  public post(url:string, body:any):Observable<any>{
    return this.http.post(environment.apiUrl + url, body);
  }
}

