import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

/*
  Generated class for the SupplierDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'build/pages/supplier-details/supplier-details.html',
})
export class SupplierDetailsPage {
    getsupplierdetails: any;

    constructor(
        private navCtrl: NavController,
        private loadingCtrl: LoadingController,
        private navParams: NavParams
    ) {
        this.getsupplierdetails = this.navParams.data;
    }

}
