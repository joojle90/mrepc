import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Mrepcdata provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
let serverURL = 'http://khaujakanjohor.org/mrepc-api/';
//let serverURL = '/mrepc-api/';
let favorites = [];

@Injectable()
export class Mrepcdata {

    data: any;
    apidata: any;
    startdate: string;
    enddate: string;
    eventid: string;
    statusid: string;
    errormsg: string;
    supplierid: string;
    buyerid: string;
    
    constructor(private http: Http) {
        this.http = http;

        this.startdate = '2016-01-01';
        this.enddate = '2018-01-01';
    }

    load(apidata) {
        if (this.data) {
            return Promise.resolve(this.data);
        }

        return new Promise((resolve, reject) => {
            this.http.get(serverURL+apidata).map(response => response.json())
            .subscribe(
                result => {
                    resolve(result);
                },
                error => {
                    Promise.reject(new Error("my error msg"))
                    .catch(error => {
                        return this.errormsg = "Error404";
                    });
                }
            );
        });
    }

    getLeftsidemenu() {
        return this.load('leftsidemenu').then(data => {
            return data.leftsidemenu;
        });
    }

//    getLeftsidemenu() {
//        return this.load('leftsidemenu').then(data => {
//            return data.leftsidemenu.submenu;
//        });
//    }

    getMastermenu() {
        return this.load('leftsidemenu').then(
            data => {
                return data.mastermenu;
            }, error => {
                console.log("error");
            });
    }

    geteventcriteria(eventid, statusid) {
        this.apidata = 'eventfilter?start_date='+this.startdate+'&end_date='+this.enddate+'&event_id='+eventid+'&status_id='+statusid;
        return this.load(this.apidata).then(data => {
            return data;
        });
    }

    getMarketplaceBuyer() {
        return this.load('rubberType').then(data => {
            return data;
        });
    }

    getMarketplaceSupplier() {
        return this.load('marketplaceList').then(data => {
            return data;
        });
    }

    getSupplierDetails(supplierid) {
        this.apidata = 'marketplaceFilter?mrepc_no='+supplierid;
        return this.load(this.apidata).then(data => {
            return data;
        });
    }

    getBuyerDetails(buyerid) {
        this.apidata = 'categoryRubberType?rubbertype='+buyerid;
        return this.load(this.apidata).then(data => {
            return data;
        });
    }

}

