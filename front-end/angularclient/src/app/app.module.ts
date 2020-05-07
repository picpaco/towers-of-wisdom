import { AppRoutingModule, routingComponents } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { GiocatoreService } from './service/giocatore-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { PlayPageComponent } from './play-page/play-page.component';
import { DemoComponent } from './demo/demo.component';
import {  GameComponent } from './game-menu/game.component'







@NgModule({
   declarations: [
      AppComponent,
      routingComponents,
      PlayPageComponent,
<<<<<<< HEAD
      FinalPageComponent,
      DemoComponent,
      GameComponent
=======
      DemoComponent
>>>>>>> 8eb47fc73575bc4543b347db474d4dd158a8fb19
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
