import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { Mrepcdata } from '../../providers/mrepcdata/mrepcdata';
import { SeminardetailsPage } from '../../pages/seminardetails/seminardetails';

/*
  Generated class for the SeminarPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  templateUrl: 'build/pages/seminar/seminar.html',
})
export class SeminarPage {

    seminarlist: any;
    urllink: string;

    constructor(
        private navCtrl: NavController,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
        private navParams: NavParams,
        public mrepcdata: Mrepcdata
    ) {
        this.urllink = this.navParams.get('urllink');
        this.presentLoadingData();
    }

    loadSeminarData() {
        return this.mrepcdata.geteventcriteria('8', '1,4').then(data => {
            this.seminarlist = data;
        });
    }

    detailsPage(page) {
        let picture = page.image;
        this.navCtrl.push(SeminardetailsPage, {
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

            this.loadSeminarData().then(() => {
                loader.dismiss();
            });
        }, 0);
    }

    seminarBookmark() {
        let alert = this.alertCtrl.create({
          title: 'Bookmark',
          subTitle: 'Your seminar has been saved',
          buttons: ['OK']
        });
        alert.present();
    }

    seminarShare() {
        let alert = this.alertCtrl.create({
          title: 'Share seminar',
          subTitle: 'Thank you for sharing',
          buttons: ['OK']
        });
        alert.present();
    }

}
