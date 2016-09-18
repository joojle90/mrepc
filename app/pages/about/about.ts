import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {
    urllink: string;

    constructor(
        private navCtrl: NavController,
        private alertCtrl: AlertController,
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
}
