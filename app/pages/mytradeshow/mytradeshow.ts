import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';

/*
  Generated class for the MytradeshowPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'build/pages/mytradeshow/mytradeshow.html',
})
export class MytradeshowPage {
    urllink: string;

    constructor(
        private navCtrl: NavController,
        private alertCtrl: AlertController,
        private navParams: NavParams
    ) {
        this.urllink = this.navParams.get('urllink');
        console.log(this.urllink);
    }

    tradeshowbtn() {
        let alert = this.alertCtrl.create({
          title: 'Message',
          subTitle: 'Thank you for join our tradeshow',
          buttons: ['OK']
        });
        alert.present();
    }

}
