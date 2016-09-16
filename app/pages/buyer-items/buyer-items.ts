import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalController, ViewController } from 'ionic-angular';


@Component({
    templateUrl: 'build/pages/buyer-items/buyer-items.html',
})
export class BuyerItemsPage {
    getitemlist: any;

    constructor(
        private navCtrl: NavController,
        private loadingCtrl: LoadingController,
        private navParams: NavParams,
        public modalCtrl: ModalController
    ) {
        this.getitemlist = this.navParams.data.buyerItems.sort((a,b) => {
            return a.item.localeCompare(b.item);
        });
        console.log(this.navParams.data);
    }

    goback() {
        console.log("here");
    }

}
