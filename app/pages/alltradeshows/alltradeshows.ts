import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, AlertController  } from 'ionic-angular';
import {Mrepcdata} from '../../providers/mrepcdata/mrepcdata';
import {TradeshowdetailsPage} from '../../pages/tradeshowdetails/tradeshowdetails';

let tradeshowname = [];
let monthname = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

@Component({
    templateUrl: 'build/pages/alltradeshows/alltradeshows.html',
})
export class AlltradeshowsPage {

    tradeshowslist: any;
    tradeshowsdata: any;
    urllink: string;
    testCheckboxOpen: boolean;
    testCheckboxResult;

    constructor(
        private navCtrl: NavController,
        private loadingCtrl: LoadingController,
        private navParams: NavParams,
        public alertCtrl: AlertController,
        public mrepcdata: Mrepcdata
    ) {
        this.urllink = this.navParams.get('imagelink');
        this.presentLoadingData();
        this.loadtradeshowsdata();
    }

    loadTradeshow() {
        return this.mrepcdata.geteventcriteria('6', '1,4').then(data => {
            this.tradeshowslist = data.filter(newdata => {
                let setdate = new Date (newdata.eventdetail.startdate);
//                return setdate.getFullYear() == new Date().getFullYear();
                return setdate > new Date();
            });
            this.tradeshowslist = this.tradeshowslist.sort((a,b) => {
                let datea = new Date (a.eventdetail.startdate);
                let dateb = new Date (b.eventdetail.startdate);
                return datea > dateb ? 1 : -1;
            });
            console.log(data);
            this.tradeshowsdata = data;
        })
    }

    loadtradeshowsdata() {
        return this.tradeshowsdata;
    }

    detailsPage(page) {
        let picture = page.banner;
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

    presentLoadingData() {
        setTimeout(() => {
            let loader = this.loadingCtrl.create({ content: "Please wait..." });
            loader.present();

            this.loadTradeshow().then(() => {
                loader.dismiss();
            });
        }, 0);
    }

    getItems(ev: any) {
        // Reset items back to all of the items
        this.loadtradeshowsdata();

        // set val to the value of the searchbar
        let val = ev.target.value;

        console.log(this.tradeshowsdata);

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.tradeshowslist = this.tradeshowsdata.filter((item) => {
                let month = monthname[item.eventdetail.startdate.split("-")[1]-1];
                return (/*item.eventdetail.startdate.toLowerCase().indexOf(val.toLowerCase()) > -1*/
                       month.toLowerCase().indexOf(val.toLowerCase()) > -1
                       || item.eventdetail.name.toLowerCase().indexOf(val.toLowerCase()) > -1
                       || item.eventdetail.description.toLowerCase().indexOf(val.toLowerCase()) > -1
                       || item.eventdetail.location.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        console.log(this.tradeshowslist);
        } else {
            this.loadTradeshow();
        }
    }

    doRefresh(refresher) {
        console.log('Begin async operation', refresher);

        setTimeout(() => {
            console.log('Async operation has ended');
            this.presentLoadingData();
            refresher.complete();
        }, 2000);
    }

    sortdatapopup() {
        let alert = this.alertCtrl.create();
        alert.setTitle('Sort options :');

        alert.addInput({
            type: 'radio',
            label: 'Sort A to Z',
            value: 'byname'
        });

        alert.addInput({
            type: 'radio',
            label: 'Past Event',
            value: 'bydatepast'
        });

        alert.addInput({
            type: 'radio',
            label: 'Coming Event',
            value: 'bydatecoming'
        });

        alert.addButton('Cancel');

        alert.addButton({
            text: 'Okay',
            handler: data => {
                console.log('Checkbox data:', data);
                console.log(this.tradeshowslist);

                if(data === "byname") {
                    this.tradeshowslist = this.tradeshowslist.sort((a,b) => {
                        return a.eventdetail.name.localeCompare(b.eventdetail.name);
                    });
                } else if(data === "bydatepast") {
                    this.tradeshowslist = this.tradeshowslist.sort((a,b) => {
                        let datea = new Date (a.eventdetail.startdate);
                        let dateb = new Date (b.eventdetail.startdate);
                        return datea < dateb ? 1 : -1;
                    });
                }

                this.testCheckboxOpen = false;
                this.testCheckboxResult = data;
            }
        });
        alert.present();
    }
}
