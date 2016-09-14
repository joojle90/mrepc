import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Mrepcdata } from '../../providers/mrepcdata/mrepcdata';
import { BuyerDetailsPage } from '../../pages/buyer-details/buyer-details';

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
            this.buyerlist = data.sort((a,b) => {
                return a.rubbername.localeCompare(b.rubbername);
            });
        })
    }

    buyerPage(buyerid, buyername) {
        let loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        setTimeout(() => {
            this.mrepcdata.getBuyerDetails(buyerid).then(data => {
                loader.dismiss();
                this.navCtrl.push(BuyerDetailsPage, {
                    buyerCategory: buyername,
                    buyerData: data
                });
            });
        }, 0);
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
