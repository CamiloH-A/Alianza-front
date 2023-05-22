import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../service/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-update-cliente',
  templateUrl: './update-cliente.component.html',
  styleUrls: ['./update-cliente.component.css']
})
export class UpdateClienteComponent implements OnInit {
  cliente: Cliente;

  constructor(
    private clientService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const  sharedKey = params['sharedKey'];
      if (sharedKey) {
        this,this.getClientBySharedKey(sharedKey)
      }
    });
  }

  /**
   * Metodo que obtiene un cliente segun su sharedKey
   * @param sharedKey 
   */
  getClientBySharedKey(sharedKey: string): void {
    this.clientService.searchClientBySharedKey('sharedKey', sharedKey).subscribe(
      data => {
        if (data.length > 0) {
          this.cliente = data[0];
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * Metodo que redirige a la pagina principal
   */
  goToClientSummary(){
    this.router.navigate(['/clientes'])
  }

  /**
   * Metodo que se ejecuta al enviar el formulario, actualiza el cliente con la nueva información.
   */
  onSubmit() {
    this.clientService.editClientBySharedKey(this.cliente.sharedKey, this.cliente).subscribe(
      (clienteActualizado) => {
        console.log('Cliente actualizado:', clienteActualizado);
        this.goToClientSummary();
      },
      (error) => {
        console.error('Error al editar el cliente:', error);
        
      }
    );
  }
  

}
