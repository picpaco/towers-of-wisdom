import { Injectable } from "@angular/core";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from "@angular/common/http";


@Injectable({
  providedIn: "root",
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("Intercept service");
    if (sessionStorage.getItem("username") && sessionStorage.getItem("token")) {
      req = req.clone({
        setHeaders: {
          "Authorization": sessionStorage.getItem("token").toString()
        },
      });
    }

    return next.handle(req);
  }
}

