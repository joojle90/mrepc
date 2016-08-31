import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events, LocalStorage, Storage } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the Userdata provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Userdata {
    HAS_LOGGED_IN = 'hasLoggedIn';
    storage = new Storage(LocalStorage);

    constructor(
        private http: Http,
        public events: Events
    ) {

    }

    login(username) {
        this.storage.set(this.HAS_LOGGED_IN, true);
        this.setUsername(username);
        this.events.publish('user:login');
    }

    setUsername(username) {
        this.storage.set('username', username);
    }

}

