import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpClientModule,HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { GiocatoreService } from "./service/giocatore-service.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { DataService } from "./landing-page/data.service";
import { BasicAuthHtppInterceptorService } from "./service/basic-auth-interceptor.service";

@NgModule({
  declarations: [AppComponent, routingComponents],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    GiocatoreService,
    BasicAuthHtppInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthHtppInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
