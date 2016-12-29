import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { Mrepcdata } from '../../providers/mrepcdata/mrepcdata';
import { BuyerDetailsPage } from '../../pages/buyer-details/buyer-details';
import { BuyerItemsPage } from '../../pages/buyer-items/buyer-items';

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
    urllink: string;

    constructor(
        private navCtrl: NavController,
        private loadingCtrl: LoadingController,
        private navParams: NavParams,
        public mrepcdata: Mrepcdata
    ) {
        this.urllink = this.navParams.data;
    }

    onPageLoaded() {
        this.presentLoadingData();
    }

    loadSupplier() {
        return this.mrepcdata.getMarketplaceBuyer().then(data => {
            this.buyerlist = data;
//            this.buyerlist = data.sort((a,b) => {
//                return a.rubbername.localeCompare(b.rubbername);
//            });
        })
    }

    buyerPageDefault(buyerid, buyername) {
        this.mrepcdata.getBuyerDetails(buyerid).then(data => {
            this.navCtrl.push(BuyerItemsPage, {
                buyerCatId: data[1].cat_id,
                buyerCategory: data[1].category,
                buyerItems: data[1].itemList,
                urllink: this.urllink
            });
        });
    }

    buyerPage(buyerid, buyername) {
        let loader = this.loadingCtrl.create({ content: "Please wait..."});
        loader.present().then(() => {
            this.mrepcdata.getBuyerDetails(buyerid).then(data => {
                this.navCtrl.push(BuyerDetailsPage, {
                    buyerCategory: buyername,
                    buyerData: data,
                    urllink: this.urllink,
                    loading: loader
                });
            });
        });
    }

    presentLoadingData() {
        setTimeout(() => {
            let loader = this.loadingCtrl.create({ content: "Please wait..." });
            loader.present();

            this.loadSupplier().then(() => {
                loader.dismiss();
            });
        }, 200);
    }

}
