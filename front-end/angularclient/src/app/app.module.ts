import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule,HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { GiocatoreService } from "./service/giocatore-service.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { DataService } from "./landing-page/data.service";
import { BasicAuthHtppInterceptorService } from "./service/basic-auth-interceptor.service";

import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { UserService } from './service/user.service';
import { AuthenticationService } from './service/authentication.service';


@NgModule({
  declarations: [AppComponent, routingComponents],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule,FormsModule],
  providers: [
    GiocatoreService,
    BasicAuthHtppInterceptorService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    UserService,
    AuthenticationService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
