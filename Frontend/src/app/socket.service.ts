import { Injectable } from '@angular/core';
import io from 'socket.io-client';
//import * as io from 'socket.io-client';
import { Observable, Subscriber } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class SocketService {
    socket: any;

    constructor() {
        this.socket = io('http://localhost:5001');
    }

    listen(Eventname: string) {
        return new Observable((subscriber) => {
            this.socket.on(Eventname, (data) => {
                subscriber.next(data);
            });
        });
    }
}
