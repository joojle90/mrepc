import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalController, ViewController } from 'ionic-angular';

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
        private navParams: NavParams,
        public modalCtrl: ModalController
    ) {
        this.getsupplierdetails = this.navParams.data;
        this.getsupplieritems = this.getsupplierdetails.companyProduct;

        this.getsupplieritems = this.getsupplierdetails.companyProduct.sort((a,b) => {
            return a.productName.localeCompare(b.productName);
        });
        console.log(this.getsupplieritems);
    }

    contactSupplier(items) {
        let modal = this.modalCtrl.create(SupplierItemsPage, items, this.getsupplierdetails.companyPerson);
        modal.present();
    }

}

@Component({
    templateUrl: 'build/pages/supplier-details/supplier-items.html',
})
export class SupplierItemsPage {
    contactSupplier: any;
    itemdetails: any;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private alertCtrl: AlertController,
        public viewCtrl: ViewController
    ) {
        this.contactSupplier = this.navParams.data.companyPerson;
        this.itemdetails = this.navParams.data;
        console.log(this.navParams.data);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    sendemail() {
        let alert = this.alertCtrl.create({
          title: 'Successful Email',
          subTitle: 'Your email has been sent',
          buttons: ['OK']
        });
        alert.present();
    }

}
