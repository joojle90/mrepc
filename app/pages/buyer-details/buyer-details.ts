import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalController, ViewController } from 'ionic-angular';
import { Mrepcdata } from '../../providers/mrepcdata/mrepcdata';
import { BuyerItemsPage } from '../../pages/buyer-items/buyer-items';
import { BuyerCompanyPage } from '../../pages/buyer-company/buyer-company';

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
    getbuyerdata: any;
    newdata: any;
    urllink: string;

    constructor(
        private navCtrl: NavController,
        private loadingCtrl: LoadingController,
        private navParams: NavParams,
        public modalCtrl: ModalController,
        public mrepcdata: Mrepcdata
    ) {
        this.loadbuyersdata();
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
        this.getbuyerdata = this.getbuyeritems;
        console.log(this.getbuyeritems);
    }

    loadbuyersdata() {
        return this.getbuyerdata;
    }

    buyerItems(itemscount, items) {
        if(itemscount == 0) {
            let loader = this.loadingCtrl.create({ content: "Please wait..."});
            loader.present().then(() => {
                this.mrepcdata.getBuyerCompany(items.cat_id, "0000").then(data => {
                    this.navCtrl.push(BuyerCompanyPage, {
                        companyData: data,
                        category: items.category,
                        urllink: this.urllink,
                        loading: loader
                    });
                });
            });
        } else {
            setTimeout(() => {
                this.navCtrl.push(BuyerItemsPage, {
                    buyerCatId: items.cat_id,
                    buyerCategory: items.category,
                    buyerItems: items.itemList,
                    urllink: this.urllink
                });
            }, 0);
        }
    }

    getItems(ev: any) {
        // Reset items back to all of the items
        this.loadbuyersdata();

        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.getbuyeritems = this.getbuyerdata.filter((item) => {
                return (item.category.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        } else {
            this.onPageLoaded();
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
