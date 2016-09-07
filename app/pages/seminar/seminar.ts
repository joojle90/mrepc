import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import {Mrepcdata} from '../../providers/mrepcdata/mrepcdata';
import {SeminardetailsPage} from '../../pages/seminardetails/seminardetails';

/*
  Generated class for the SeminarPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
let monthname = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

@Component({
  templateUrl: 'build/pages/seminar/seminar.html',
})
export class SeminarPage {

    seminarlist: any;
    seminarday: any;

    constructor(
        private navCtrl: NavController,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
        public mrepcdata: Mrepcdata
    ) {

        this.presentLoadingData();
        this.loadSeminarData();
    }

    loadSeminarData() {
        this.mrepcdata.geteventcriteria('8', '1,4').then(data => {
            this.seminarlist = data;
            this.seminarday = data.filter(newdata => {
                return newdata.eventdetail.startdate;
            });
        });
    }

    loadSeminarDay() {
                console.log(this.seminarday);
//        let seminarday = this.seminarlist.filter(newdata => {
//            console.log(newdata.eventdetail.startdate);
//        });
    }

    detailsPage(page) {
        console.log(page);
        let picture = page.image;
        this.navCtrl.push(SeminardetailsPage, {
            eventpic: picture,
            startdate: page.eventdetail.startdate,
            enddate: page.eventdetail.enddate,
            location: page.eventdetail.location,
            email: page.eventdetail.email,
            website: page.eventdetail.linkurl,
            eventdetails: page.eventdetail
        });
    }

    presentLoadingData() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();

        if(this.seminarlist !== null){
            setTimeout(() => {
                loading.dismiss();
            }, 2000);
        }
    }

    convertdate(date){
        let thedate = date.split("-");
        let newdate = thedate[2] +" "+ monthname[thedate[1]-1] +" "+ thedate[0];
        return newdate;
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
