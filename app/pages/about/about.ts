import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {
    constructor(
        private navCtrl: NavController,
        private alertCtrl: AlertController
    ) {

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
