import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

/*
  Generated class for the UserprofilePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'build/pages/userprofile/userprofile.html',
})
export class UserprofilePage {

    constructor(
        private navCtrl: NavController,
        private alertCtrl: AlertController
    ) {

    }

    logout() {
        let alert = this.alertCtrl.create({
          title: 'Status',
          subTitle: 'Thank you for using our application',
          buttons: ['OK']
        });
        alert.present();
    }

}
