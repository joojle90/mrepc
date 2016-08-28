import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Mrepcdata provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
let serverURL = '/mrepc-api/';
let favorites = [];

@Injectable()
export class Mrepcdata {

    data: any;
    apidata: any;
    
    constructor(private http: Http) {
        this.http = http;
        this.getLeftsidemenu(this.apidata);
    }

    load(apidata) {
        if (this.data) {
            return Promise.resolve(this.data);
        }

        return new Promise(resolve => {
            if(apidata === undefined) {
                console.log('data undefined');
            } else {
                this.http.get(serverURL+apidata).subscribe(res => {
                    resolve(res.json());
                });
            }
        });
    }
    
    getLeftsidemenu(apidata) {
        return this.load(apidata).then(data => {
            console.log(data.leftsidemenu.submenu);
            return data.leftsidemenu.submenu;
        });
    }

}

