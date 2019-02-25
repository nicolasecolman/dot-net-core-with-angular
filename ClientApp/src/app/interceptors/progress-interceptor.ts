import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import { BusyService } from '../services/busy.service';

@Injectable()
export class ProgressInterceptor implements HttpInterceptor {

    constructor(private busyService: BusyService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).do(
            event => {
                // If request was sent
                if ((event.type == 0))
                {
                    console.log("Estoy en progress interceptror")
                    
                    this.busyService.changeBusy("busy");
                }
                else
                {
                    console.log("Estoy en progress interceptror...")
                    
                    this.busyService.changeBusy("not busy");
                }
            }
        )
    }
}