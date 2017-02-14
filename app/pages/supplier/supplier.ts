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
    supplierdata: any;

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
        this.loadsupplierdata();
    }

    loadSupplier() {
        return this.mrepcdata.getMarketplaceSupplier().then(data => {
            this.supplierlist = data.sort((a,b) => {
                return a.companyName.localeCompare(b.companyName);
            });
            this.supplierdata = this.supplierlist;
//            console.log(this.supplierdata);
        })
    }

    loadsupplierdata() {
        return this.supplierdata;
    }

    supplierPage(supplierid) {
        console.log(supplierid);
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

    doRefresh(refresher) {
        console.log('Begin async operation', refresher);

        setTimeout(() => {
            console.log('Async operation has ended');
            this.presentLoadingData();
            refresher.complete();
        }, 2000);
    }

    getItems(ev: any) {
        // Reset items back to all of the items
        this.loadsupplierdata();

        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.supplierlist = this.supplierdata.filter((item) => {
                return (item.companyName.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        } else {
            this.loadSupplier();
        }
    }
}
