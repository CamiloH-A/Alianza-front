import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';
import { LocalStorageService } from '../service/local-storage.service';
import { Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv/ngx-csv';


@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {

  public errorMessage: string = '';
  public searchValue: string = '';
  clientes: Cliente[];

  constructor(
    private clienteService: ClienteService,
    private localStorage: LocalStorageService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getClients();
  }

  /**
   * Metodo que me retorna una lista con todos los clientes almacenados
   * @author achernandez
   */
  private getClients() {
    this.clienteService.getClientList().subscribe(data => {
      this.clientes = data;
      this.localStorage.setItem('Clientes', JSON.stringify(data));
    });
  }  

  /**
   * Metodo que obtiene un cliente que se busca mediante el sharedKey
   * @author achernandez
   */
  getClientsBySharedKey() {
    if (this.searchValue) {
      this.clienteService.searchClientBySharedKey('sharedKey', this.searchValue).subscribe(data => {
        if (data.length > 0) {
          this.clientes = data;
          this.errorMessage = " ";
        } else {
          this.clientes = [];
          this.errorMessage = "Shared key no encontrado";
        }
      });
    } else {
      this.getClients();
      this.errorMessage = " ";
    }
  }

  editClient(sharedKey: string): void {
    this.router.navigate(['/editar-cliente'],{queryParams: { sharedKey}})
  }

  /**
   * Metodo que elimina un dato de la tabla según el shared key de la fila donde se elije
   * @param sharedKey 
   */
  deleteClient(sharedKey: string): void {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este cliente?');
    if (confirmDelete) {
      this.clienteService.deleteClient(sharedKey).subscribe(data => {
        console.log(data)
        this.getClients();        
      }, error =>{
        console.log('Error al eliminar el cliente:', error);
      });
    }
  }

  /**
   * Metodo que le da formato yyyy-MM-dd a la fecha que llega de la consulta
   * @param fechaCompleta fecha que recibe de la consulta
   * @returns fecha formateada
   * 
   */
  dateFormater(fechaCompleta: string): String {
    let fecha = new Date(fechaCompleta);
    const fechaFormateada = fecha.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    }).split(' ').join('-');
    return fechaFormateada;
  }

  /**
   * Metodo que exporta a un archivo csv el resultado de la busqueda
   */
  exportToCsv(): void {
    const csvOptions = {
      headers: ['Shared Key', 'Bussines ID', 'E-mail', 'Phone', 'Data Added'],
      nullToEmptyString: true
    };

    const csvData = this.clientes.map(cliente => {
      return {
        'Shared Key': cliente.sharedKey,
        'Bussines ID': cliente.bussinesId,
        'E-mail': cliente.email,
        'Phone': cliente.phone,
        'Data Added': this.dateFormater(cliente.dateAdded)
      };
    });

    const fileName = 'clientes';
    new ngxCsv(csvData, fileName, csvOptions);
  }

}
