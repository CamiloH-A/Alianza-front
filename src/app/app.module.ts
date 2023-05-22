import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarClientesComponent } from './listar-clientes/listar-clientes.component';
import { HttpClientModule} from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RegistarClienteComponent } from './registar-cliente/registar-cliente.component';
import { FormsModule } from '@angular/forms';
import { UpdateClienteComponent } from './update-cliente/update-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    ListarClientesComponent,
    SidebarComponent,
    RegistarClienteComponent,
    UpdateClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
