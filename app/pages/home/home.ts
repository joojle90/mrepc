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

        this.presentLoadingData();

        this.mrepcdata.getMastermenu().then(data => {
            this.mastermenu = data;
        });

        this.mrepcdata.geteventcriteria('6', '1').then(data => {
            this.comingsoonevent = data.filter(newdata => {
                let setdate = new Date (newdata.eventdetail.startdate);
                return setdate > new Date();
            });
            this.comingsoonevent = this.comingsoonevent.slice(0,5);
            this.comingsoonevent = this.comingsoonevent.sort((a,b) => {
                let datea = new Date (a.eventdetail.startdate);
                let dateb = new Date (b.eventdetail.startdate);
                return datea > dateb;
            });
        })

    }

    tradeshowspage(page) {
        let picture = page.image;
        this.navCtrl.push(TradeshowdetailsPage, {
            eventpic: picture,
            startdate: page.eventdetail.startdate,
            enddate: page.eventdetail.enddate,
            location: page.eventdetail.location,
            website: page.eventdetail.linkurl,
            eventdetails: page.eventdetail
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
    
    presentLoadingData() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();

        if(this.mastermenu !== null){
            setTimeout(() => {
                loading.dismiss();
            }, 2000);
        }
    }
}
