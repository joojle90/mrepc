import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the TradeshowdetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

let monthname = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

@Component({
    templateUrl: 'build/pages/tradeshowdetails/tradeshowdetails.html',
})
export class TradeshowdetailsPage {
    geteventdetails: any;
    eventstart: string;
    eventend: string;
    urllink: string;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams
    ) {

        this.geteventdetails = this.navParams.data;
        this.urllink = this.navParams.get('urllink');
        console.log(this.urllink);

        this.eventstart = this.convertdate(this.geteventdetails.startdate);
        this.eventend = this.convertdate(this.geteventdetails.enddate);
    }

    convertdate(date){
        let thedate = date.split("-");
        let newdate = thedate[2] +" "+ monthname[thedate[1]-1] +" "+ thedate[0];
        return newdate;
    }

}
