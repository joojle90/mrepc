import {Component} from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
import {Mrepcdata} from '../../providers/mrepcdata/mrepcdata';
import {TradeshowdetailsPage} from '../../pages/tradeshowdetails/tradeshowdetails';
import {MarketplacePage} from '../../pages/marketplace/marketplace';
import {AlltradeshowsPage} from '../../pages/alltradeshows/alltradeshows';
import {SeminarPage} from '../../pages/seminar/seminar';
import {UseraccountPage} from '../../pages/useraccount/useraccount';

let menubutton = [MarketplacePage, AlltradeshowsPage, SeminarPage];

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

    mastermenu: any;
    comingsoonevent: any;

    constructor(
        private navCtrl: NavController,
        private loadingCtrl: LoadingController,
        public mrepcdata: Mrepcdata
        ) {

        this.mrepcdata.getMastermenu().then(data => {
            this.mastermenu = data;
        });

        this.mrepcdata.geteventcriteria('6', '1').then(data => {
            this.comingsoonevent = data.slice(0,5);
        })

    }

    tradeshowspage(page) {
        let picture = page.image;
        this.navCtrl.push(TradeshowdetailsPage, {
            eventpic: picture,
            eventdetails: page.eventdetail[0]
        });
    }

    openmenuPage(pageid) {
        //console.log(pageid);
        this.navCtrl.push(menubutton[pageid]);
    }

    useraccountPage(pageid) {
        //console.log(pageid);
        this.navCtrl.push(UseraccountPage);
    }
    
    presentLoadingDefault() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();

        setTimeout(() => {
            loading.dismiss();
        }, 5000);
    }
}
