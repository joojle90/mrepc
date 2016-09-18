import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalController, ViewController } from 'ionic-angular';
import { BuyerItemsPage } from '../../pages/buyer-items/buyer-items';

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
    newdata: any;
    urllink: string;

    constructor(
        private navCtrl: NavController,
        private loadingCtrl: LoadingController,
        private navParams: NavParams,
        public modalCtrl: ModalController
    ) {
    }

    ionViewDidEnter() {
        setTimeout(() => {
            this.navParams.get('loading').dismiss();
        }, 200);
    }

    onPageLoaded() {
        this.urllink = this.navParams.get('urllink');
        this.getbuyerdetails = this.navParams.data;
        this.getbuyeritems = this.getbuyerdetails.buyerData.sort((a,b) => {
            return a.category.localeCompare(b.category);
        });
    }

    buyerItems(itemscount, items) {
        if(itemscount == 0) {
            let modal = this.modalCtrl.create(BuyerContactPage, items);
            modal.present();
        } else {
//            let loader = this.loadingCtrl.create({ content: "Please wait..." });
//            loader.present();
            setTimeout(() => {
//                loader.dismiss();
                this.navCtrl.push(BuyerItemsPage, {
                    buyerCategory: items.category,
                    buyerItems: items.itemList,
                    urllink: this.urllink
                });
            }, 0);
        }
    }

}

@Component({
    templateUrl: 'build/pages/buyer-details/buyer-contact.html',
})
export class BuyerContactPage {
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
