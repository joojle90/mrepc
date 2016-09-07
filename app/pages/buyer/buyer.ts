import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import {Mrepcdata} from '../../providers/mrepcdata/mrepcdata';

/*
  Generated class for the BuyerPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'build/pages/buyer/buyer.html',
})
export class BuyerPage {

    buyerlist: any;

    constructor(
        private navCtrl: NavController,
        private loadingCtrl: LoadingController,
        public mrepcdata: Mrepcdata
    ) {
        this.loadSupplier();
//        this.presentLoadingData();
    }

    loadSupplier() {
        return this.mrepcdata.getMarketplaceBuyer().then(data => {
            this.buyerlist = data;
        })
    }

    presentLoadingData() {
        setTimeout(() => {
            let loader = this.loadingCtrl.create({ content: "Please wait..." });
            loader.present();

            this.loadSupplier().then(() => {
                loader.dismiss();
            });
        }, 0);
    }

}
