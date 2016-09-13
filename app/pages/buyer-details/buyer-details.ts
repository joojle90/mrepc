import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalController, ViewController } from 'ionic-angular';

/*
  Generated class for the BuyerDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'build/pages/buyer-details/buyer-details.html',
})
export class BuyerDetailsPage {
    getbuyerdetails: any;
    getbuyeritems: any;

    constructor(
        private navCtrl: NavController,
        private loadingCtrl: LoadingController,
        private navParams: NavParams,
        public modalCtrl: ModalController
    ) {
        this.getbuyerdetails = this.navParams.data;
        this.getbuyeritems = this.getbuyerdetails.companyProduct;

//        this.getsupplieritems = this.getbuyerdetails.companyProduct.sort((a,b) => {
//            return a.productName.localeCompare(b.productName);
//        });
        console.log(this.getbuyerdetails);
    }

}
