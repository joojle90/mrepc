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
        this.getbuyerdetails = this.navParams.data
        this.getbuyeritems = this.getbuyerdetails.buyerData.sort((a,b) => {
            return a.category.localeCompare(b.category);
        });
        console.log(this.getbuyeritems);
    }

    buyerItems(itemscount, items) {
        if(itemscount == 0) {
            let modal = this.modalCtrl.create(BuyerItemsPage, items);
            modal.present();
        } else {
            console.log("here 2");
        }
    }

}

@Component({
    templateUrl: 'build/pages/buyer-details/buyer-items.html',
})
export class BuyerItemsPage {
    contactBuyer: any;
    itemdetails: any;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private alertCtrl: AlertController,
        public viewCtrl: ViewController
    ) {
        this.contactBuyer = this.navParams.data;
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
