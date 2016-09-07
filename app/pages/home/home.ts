import {Component, ViewChild, ElementRef} from '@angular/core';
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
    @ViewChild('imgtest') imgtest: ElementRef;

    mastermenu: any;
    comingsoonevent: any;
    homeOptions: any;
    imageurl: string;

    constructor(
        private navCtrl: NavController,
        private loadingCtrl: LoadingController,
        public mrepcdata: Mrepcdata
        ) {

        this.homeOptions = {
            initialSlide: 0,
            autoplay: 3000,
            autoplayDisableOnInteraction: false
        };

        this.presentLoadingData();
    }

    loadHomemenu() {
        this.loadComingsoonMenu();
        return this.mrepcdata.getMastermenu().then(data => {
            this.mastermenu = data;
        });
    }

    loadComingsoonMenu() {
        return this.mrepcdata.geteventcriteria('6', '1').then(data => {
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
        });

    }

    tradeshowspage(page) {
        let picture = page.image;
        this.navCtrl.push(TradeshowdetailsPage, {
            eventpic: picture,
            startdate: page.eventdetail.startdate,
            enddate: page.eventdetail.enddate,
            location: page.eventdetail.location,
            email: page.eventdetail.email,
            website: page.eventdetail.linkurl,
            eventdetails: page.eventdetail
        });
    }

    openmenuPage(pageid) {
        this.navCtrl.push(menubutton[pageid]);
    }

    useraccountPage(pageid) {
        this.navCtrl.push(UseraccountPage);
    }
    
    presentLoadingData() {
        setTimeout(() => {
            let loader = this.loadingCtrl.create({ content: "Please wait..." });
            loader.present();

            this.loadHomemenu().then(() => {
                loader.dismiss();
            });
        }, 0);
    }
}
