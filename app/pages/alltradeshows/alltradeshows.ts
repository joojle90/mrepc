import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, AlertController  } from 'ionic-angular';
import {Mrepcdata} from '../../providers/mrepcdata/mrepcdata';
import {TradeshowdetailsPage} from '../../pages/tradeshowdetails/tradeshowdetails';



let tradeshowname = [];

@Component({
    templateUrl: 'build/pages/alltradeshows/alltradeshows.html',
})
export class AlltradeshowsPage {

    tradeshowslist: any;
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
        this.urllink = this.navParams.get('urllink');
        this.presentLoadingData();
    }

    loadTradeshow() {
        return this.mrepcdata.geteventcriteria('6', '1,4').then(data => {
            this.tradeshowslist = data;
        console.log(this.tradeshowslist);

            for(let i in data) {
                tradeshowname.push ({
                    name: data[i].eventdetail["name"],
                    startdate: data[i].eventdetail["startdate"],
                    enddate: data[i].eventdetail["enddate"]
                })
            }
        })
    }

    loadTradeshowname() {
        return tradeshowname;
    }

    detailsPage(page) {
        let picture = page.image;
        this.navCtrl.push(TradeshowdetailsPage, {
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

        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.tradeshowslist = this.tradeshowslist.filter((item) => {
//                console.log(item.eventdetail.startdate);
                return (item.eventdetail.startdate.toLowerCase().indexOf(val.toLowerCase()) > -1
                       || item.eventdetail.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        } else {
            this.loadTradeshow();
        }
    }

    sortdatapopup() {
        let alert = this.alertCtrl.create();
        alert.setTitle('Sort options :');

        alert.addInput({
            type: 'checkbox',
            label: 'Sort A to Z',
            value: 'value1',
            checked: true
        });

        alert.addInput({
            type: 'checkbox',
            label: 'Sort by Latest Event',
            value: 'value2'
        });

        alert.addButton('Cancel');

        alert.addButton({
            text: 'Okay',
            handler: data => {
            console.log('Checkbox data:', data);
            this.testCheckboxOpen = false;
            this.testCheckboxResult = data;
            }
        });
        alert.present();
    }
}
