import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalController, ViewController } from 'ionic-angular';

let monthname = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

@Component({
    templateUrl: 'build/pages/tradeshowdetails/tradeshowdetails.html',
})
export class TradeshowdetailsPage {
    geteventdetails: any;
    eventstart: string;
    eventend: string;
    urllink: string;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        public modalCtrl: ModalController
    ) {

        this.geteventdetails = this.navParams.data;
        this.urllink = this.navParams.get('urllink');
        console.log(this.urllink);

        this.eventstart = this.convertdate(this.geteventdetails.startdate);
        this.eventend = this.convertdate(this.geteventdetails.enddate);
    }

    convertdate(date){
        let thedate = date.split("-");
        let newdate = thedate[2] +" "+ monthname[thedate[1]-1] +" "+ thedate[0];
        return newdate;
    }

    registerform() {
        let modal = this.modalCtrl.create(TradeshowdetailsFormPage);
        modal.present();
    }

}

@Component({
    templateUrl: 'build/pages/tradeshowdetails/tradeshowdetails-register.html',
})
export class TradeshowdetailsFormPage {
    contactSupplier: any;
    itemdetails: any;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private alertCtrl: AlertController,
        public viewCtrl: ViewController
    ) {
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    register() {
        let alert = this.alertCtrl.create({
          title: 'Successful registration',
          subTitle: 'Your request will be process',
          buttons: ['OK']
        });
        alert.present();
    }

}
