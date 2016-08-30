import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Mrepcdata} from '../../providers/mrepcdata/mrepcdata';
import {TradeshowdetailsPage} from '../../pages/tradeshowdetails/tradeshowdetails';

/*
  Generated class for the AlltradeshowsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'build/pages/alltradeshows/alltradeshows.html',
})
export class AlltradeshowsPage {

    tradeshowslist: any;

    constructor(
        private navCtrl: NavController,
        public mrepcdata: Mrepcdata
    ) {

        this.mrepcdata.geteventcriteria('6', '1,4').then(data => {
            this.tradeshowslist = data;
        })
    }

    detailsPage(page) {
        console.log(page);
        let picture = page.image;
        this.navCtrl.push(TradeshowdetailsPage, {
            eventpic: picture,
            eventdetails: page.eventdetail[0]
        });
    }
}
