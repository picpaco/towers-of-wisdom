import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ListagiocatoriComponent } from './listagiocatori/listagiocatori.component';
import { FormgiocatoreComponent } from './formgiocatore/formgiocatore.component';
import { GiocatoreService } from './service/giocatore-service.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [AppComponent, ListagiocatoriComponent, FormgiocatoreComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [GiocatoreService],
  bootstrap: [AppComponent],
})
export class AppModule {}
