import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registar-cliente',
  templateUrl: './registar-cliente.component.html',
  styleUrls: ['./registar-cliente.component.css']
})
export class RegistarClienteComponent implements OnInit {

  cliente: Cliente = new Cliente();

  constructor(
    private clienteService: ClienteService,
    private router: Router
    ) { }

  ngOnInit(): void {    
    
  }

  /**
   * Metodo que almacena un cliente en la base de datos con los datos 
   * del formulario y redirige a la pagina principal
   */
  saveClient(){
    this.clienteService.saveClient(this.cliente).subscribe(data => {
      console.log(data);
      this.goToClientSummary();            
    }, error => console.log(error));
  }

  /**
   * Metodo que redirige a la pagina principal
   */
  goToClientSummary(){
    this.router.navigate(['/clientes'])
  }

  /**
   * Metodo que se ejecuta al enviar el formulario
   */
  onSubmit(){
    this.saveClient();
  }
}
