import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, NavParams, SqlStorage, Storage } from 'ionic-angular';
import { Mrepcdata } from '../../providers/mrepcdata/mrepcdata';
import {TradeshowdetailsPage} from '../../pages/tradeshowdetails/tradeshowdetails';

@Component({
    templateUrl: 'build/pages/mytradeshow/mytradeshow.html',
})
export class MytradeshowPage {

    bookmarklist: any;
    urllink: string;
    myeventlist: any;

    private storage: Storage;
    public mybookmarkList: any = [];

    constructor(
        private navCtrl: NavController,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        private navParams: NavParams,
        public mrepcdata: Mrepcdata
    ) {
        this.storage = new Storage(SqlStorage);
        this.urllink = this.navParams.get('imagelink');
    }

    onPageWillEnter() {
        this.refresh();
        this.presentLoadingData();
    }

    refresh() {
        this.storage.query("SELECT * FROM eventbook").then((data) => {
            if(data.res.rows.length > 0) {
                this.mybookmarkList = [];
                for(let i = 0; i < data.res.rows.length; i++) {
                    this.mybookmarkList.push({
                        "eventid": data.res.rows.item(i).eventid,
                        "location": data.res.rows.item(i).location,
                    });
                }
                console.log(this.mybookmarkList);
            } else {
                this.mybookmarkList = [];
                let alert = this.alertCtrl.create({
                    title: "No Bookmark",
                    subTitle: "You don't have any bookmark",
                    buttons: ["OK"]
                });
                alert.present();
            }
        }, (error) => {
            console.log(error);
        });
    }

    loadBookmark() {
        return this.mrepcdata.geteventcriteria('6', '1,4').then(data => {
            this.bookmarklist = data.filter(newdata => {
                let setdate = new Date (newdata.eventdetail.startdate);
//                return setdate.getFullYear() == new Date().getFullYear();
                return setdate > new Date();
            });
            this.bookmarklist = this.bookmarklist.sort((a,b) => {
                let datea = new Date (a.eventdetail.startdate);
                let dateb = new Date (b.eventdetail.startdate);
                return datea > dateb ? 1 : -1;
            });
//            console.log(this.bookmarklist);
//            console.log(this.mybookmarkList);

            this.myeventlist = [];
            for (var i in this.bookmarklist) {
                for (var j in this.mybookmarkList) {
                    if(this.bookmarklist[i].idlist == this.mybookmarkList[j].eventid) {
                        this.myeventlist.push(this.bookmarklist[i]);
//                        this.myeventlist[i] = this.bookmarklist[i];
//                        console.log(this.myeventlist);
                    } else {
                        console.log("no result");
                    }
                }
            }
        })
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

            this.loadBookmark().then(() => {
                loader.dismiss();
            });
        }, 0);
    }

    doRefresh(refresher) {
        console.log('Begin async operation', refresher);

        setTimeout(() => {
            console.log('Async operation has ended');
            this.presentLoadingData();
            refresher.complete();
        }, 2000);
    }

}
