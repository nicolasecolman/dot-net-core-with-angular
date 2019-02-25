import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class BusyService {

    numberOfBusyRequests: number = 0;
    numberOfNonBusyRequests: number = 0;

    // Observable navItem source
    private _busySource = new BehaviorSubject<boolean>(null);
    // Observable navItem stream
    busy$ = this._busySource.asObservable();

    constructor() { }

    changeBusy(val) {

        if ((val == true)) {
            this.numberOfBusyRequests = this.numberOfBusyRequests + 1;
        }
        else {
            this.numberOfNonBusyRequests = this.numberOfNonBusyRequests + 1;
        }

        if (this.numberOfBusyRequests == this.numberOfNonBusyRequests) {
            this._busySource.next(false);
        }
        else {
            this._busySource.next(true);
        }

    }
}