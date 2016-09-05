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
    startdate: string;
    enddate: string;
    eventid: string;
    statusid: string;
    
    constructor(private http: Http) {
        this.http = http;

        this.startdate = '2016-01-01';
        this.enddate = '2017-01-01';
    }

    load(apidata) {
        if (this.data) {
            return Promise.resolve(this.data);
        }

        return new Promise(resolve => {
            this.http.get(serverURL+apidata).subscribe(
                result => {
                    resolve(result.json());
                },
                error => {
                    console.log(error);
                }
            );
        });
    }
    
    getLeftsidemenu() {
        return this.load('leftsidemenu').then(data => {
            return data.leftsidemenu.submenu;
        }, (error) => {
            console.log(error);
        });
//            if (this.data) {
//                return Promise.resolve(data.leftsidemenu.submenu);
//            } else {
//                console.log("error");
//            }
    }

    getMastermenu() {
        return this.load('leftsidemenu').then(data => {
            return data.mastermenu;
        });
    }

    geteventcriteria(eventid, statusid) {
        this.apidata = 'eventfilter?start_date='+this.startdate+'&end_date='+this.enddate+'&event_id='+eventid+'&status_id='+statusid;
        return this.load(this.apidata).then(data => {
            return data;
        });
    }

}

