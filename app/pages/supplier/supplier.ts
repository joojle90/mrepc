import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
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
        return this.mrepcdata.getMarketplaceSupplier().then(data => {
            this.supplierlist = data.sort((a,b) => {
                return a.companyName.localeCompare(b.companyName);
            });
        })
    }

    supplierPage(supplierid) {
        let loader = this.loadingCtrl.create({ content: "Please wait..."});
        loader.present().then(() => {
            this.mrepcdata.getSupplierDetails(supplierid).then(data => {
                this.navCtrl.push(SupplierDetailsPage, {
                    companyData: data[0],
                    companyPerson: data[0].contactPerson,
                    companyProduct: data[0].latestProduct,
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
        }, 0);
    }
}
