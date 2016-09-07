import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Mrepcdata } from '../../providers/mrepcdata/mrepcdata';
import { SupplierDetailsPage } from '../../pages/supplier-details/supplier-details';

/*
  Generated class for the SupplierPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'build/pages/supplier/supplier.html',
})
export class SupplierPage {

    supplierlist: any;

    constructor(
        private navCtrl: NavController,
        private loadingCtrl: LoadingController,
        public mrepcdata: Mrepcdata
    ) {
        this.presentLoadingData();
    }

    loadSupplier() {
        return this.mrepcdata.getMarketplaceSupplier().then(data => {
            this.supplierlist = data;
        })
    }

    supplierPage(supplierID) {
        let loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        setTimeout(() => {
            this.mrepcdata.getSupplierDetails(supplierID).then(data => {
                loader.dismiss();
                this.navCtrl.push(SupplierDetailsPage, {
                    companyData: data[0],
                    companyPerson: data[0].contactPerson,
                    companyProduct: data[0].latestProduct
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
