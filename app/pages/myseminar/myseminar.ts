import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

/*
  Generated class for the MyseminarPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'build/pages/myseminar/myseminar.html',
})
export class MyseminarPage {

    constructor(
        private navCtrl: NavController,
        private alertCtrl: AlertController
    ) {

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
