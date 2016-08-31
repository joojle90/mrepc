import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the TradeshowdetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

let monthname = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

@Component({
    templateUrl: 'build/pages/tradeshowdetails/tradeshowdetails.html',
})
export class TradeshowdetailsPage {
    geteventdetails: any;
    eventstart: string;
    eventend: string;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams
    ) {

        this.geteventdetails = this.navParams.data;
        console.log(this.geteventdetails);

        this.eventstart = this.convertdate(this.geteventdetails.startdate);
        this.eventend = this.convertdate(this.geteventdetails.enddate);
    }

    convertdate(date){
        let thedate = date.split("-");
        let newdate = thedate[2] +" "+ thedate[1] +" "+ thedate[0];
        return newdate;
    }

}
