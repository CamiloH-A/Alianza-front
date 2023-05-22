import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarClientesComponent } from './listar-clientes/listar-clientes.component';
import { RegistarClienteComponent } from './registar-cliente/registar-cliente.component';
import { UpdateClienteComponent } from './update-cliente/update-cliente.component';


const routes: Routes = [
  {path: 'clientes', component:ListarClientesComponent},
  {path: '', redirectTo:'clientes', pathMatch:'full'},
  {path: 'registrar-cliente', component:RegistarClienteComponent},
  {path: 'editar-cliente', component:UpdateClienteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
