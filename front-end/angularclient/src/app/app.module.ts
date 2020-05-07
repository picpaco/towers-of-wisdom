import { AppRoutingModule, routingComponents } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { GiocatoreService } from './service/giocatore-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { PlayPageComponent } from './play-page/play-page.component';
import { DemoComponent } from './demo/demo.component';







@NgModule({
   declarations: [
      AppComponent,
      routingComponents,
      PlayPageComponent,
      DemoComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule
   ],
   providers: [
      GiocatoreService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
