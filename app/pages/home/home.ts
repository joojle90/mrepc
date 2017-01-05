import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, LoadingController, Nav} from 'ionic-angular';
import {Mrepcdata} from '../../providers/mrepcdata/mrepcdata';
import {TradeshowdetailsPage} from '../../pages/tradeshowdetails/tradeshowdetails';
import {MarketplacePage} from '../../pages/marketplace/marketplace';
import {AlltradeshowsPage} from '../../pages/alltradeshows/alltradeshows';
import {SeminarPage} from '../../pages/seminar/seminar';
import {UseraccountPage} from '../../pages/useraccount/useraccount';
import {TutorialPage} from '../../pages/tutorial/tutorial';

let menubutton = [MarketplacePage, TutorialPage, SeminarPage];
let monthname = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    @ViewChild('imgtest') imgtest: ElementRef;
    @ViewChild(Nav) nav: Nav;

    mastermenu: any;
    comingsoonevent: any;
    comingsooneventData: any;
    homeOptions: any;
    imageurl: string;
    eventstart: string;
    urllink: string;

    constructor(
        private navCtrl: NavController,
        private loadingCtrl: LoadingController,
        public mrepcdata: Mrepcdata
        ) {

        this.homeOptions = {
            initialSlide: 0,
            autoplay: 3500,
            autoplayDisableOnInteraction: false,
            loop: true
        };
        this.urllink = "http://khaujakanjohor.org/mrepc-api";
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
            this.comingsoonevent = this.comingsoonevent.sort((a,b) => {
                let datea = new Date (a.eventdetail.startdate);
                let dateb = new Date (b.eventdetail.startdate);
                return datea > dateb ? 1 : -1;
            });
            this.comingsoonevent = this.comingsoonevent.slice(0,5);
            console.log(this.comingsoonevent);
        });
    }

    loadTest() {
        this.mrepcdata.geteventcriteria('6', '1').then(data => {
            this.comingsooneventData = data.filter(newdata => {
                let setdate = new Date (newdata.eventdetail.startdate);
                return setdate > new Date();
            });
            this.comingsooneventData = this.comingsoonevent.slice(0,5);
        });
    }

    tradeshowspage(page) {
        let picture = page.image;
        this.navCtrl.push(TradeshowdetailsPage, {
            eventid: page.idlist,
            eventpic: picture,
            startdate: page.eventdetail.startdate,
            enddate: page.eventdetail.enddate,
            location: page.eventdetail.location,
            email: page.eventdetail.email,
            website: page.eventdetail.linkurl,
            eventdetails: page.eventdetail,
            urllink: this.urllink
        });
    }

    openmenuPage(pageid) {
        this.navCtrl.push(menubutton[pageid], {
            urllink: this.urllink
        });
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

    convertdate(date){
        let thedate = date.split("-");
        let newdate = thedate[2] +" "+ monthname[thedate[1]-1] +" "+ thedate[0];
        return newdate;
    }
}
