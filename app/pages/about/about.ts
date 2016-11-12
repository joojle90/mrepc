import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalController, ViewController } from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {
    urllink: string;

    constructor(
        private navCtrl: NavController,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        public modalCtrl: ModalController,
        private navParams: NavParams
    ) {
        this.urllink = this.navParams.get('urllink');
    }

    mapshow() {
        let alert = this.alertCtrl.create({
          title: 'Coming Soon',
          subTitle: 'We will update our Map',
          buttons: ['OK']
        });
        alert.present();
    }

    contactus() {
        let modal = this.modalCtrl.create(AboutcontactPage);
        modal.present();
    }
}

@Component({
    templateUrl: 'build/pages/about/about-contact.html',
})
export class AboutcontactPage {
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

    submitinquiry() {
        let alert = this.alertCtrl.create({
          title: 'Successful message',
          subTitle: 'Thank you for submit your inquiry',
          buttons: ['OK']
        });
        alert.present();
    }

}
