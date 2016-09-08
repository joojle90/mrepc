import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController, ViewController } from 'ionic-angular';

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
    getsupplieritems: any;

    constructor(
        private navCtrl: NavController,
        private loadingCtrl: LoadingController,
        private navParams: NavParams
    ) {
        this.getsupplierdetails = this.navParams.data;
        this.getsupplieritems = this.getsupplierdetails.companyProduct;

        this.getsupplieritems = this.getsupplierdetails.companyProduct.sort((a,b) => {
            return a.productName.localeCompare(b.productName);
        });
        console.log(this.getsupplieritems);
    }

    contactSupplier(items) {
        console.log(items);
    }

}

@Component({
    templateUrl: 'build/pages/supplier-items/supplier-items.html',
})
export class SupplierItemsPage {

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        public viewCtrl: ViewController
    ) {

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}
