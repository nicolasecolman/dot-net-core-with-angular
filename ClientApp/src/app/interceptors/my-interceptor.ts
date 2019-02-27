import { Observable } from 'rxjs/Observable';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import 'rxjs/add/operator/do';

 @Injectable()
export class MyInterceptor implements HttpInterceptor {
 
    constructor(@Inject('BASE_URL') private SERVER_API_URL: string) {
        this.SERVER_API_URL += 'api';
    }
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request || !request.url || (/^http/.test(request.url) && !(this.SERVER_API_URL && request.url.startsWith(this.SERVER_API_URL)))) {
            return next.handle(request);
        }

        //Enviamos token en header http
        let authToken = 'un_token_cualquiera';
        request = request.clone({
            responseType: 'json',
            setHeaders: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json; charset=utf-8'
            }
        });

        return next.handle(request).do(
            event => {
                // If request was sent
                if ((event.type == 0))
                {
                    console.log("Transacción iniciada")
                }
                else
                {
                    console.log("Transacción finalizada")
                }
            }
        );
    }
 
}