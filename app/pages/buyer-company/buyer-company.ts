import { Component, Directive, ElementRef, Input } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalController, ViewController } from 'ionic-angular';
import { Mrepcdata } from '../../providers/mrepcdata/mrepcdata';

@Component({
    templateUrl: 'build/pages/buyer-company/buyer-company.html',
})
export class BuyerCompanyPage {
    itemlist: any;
    itemcategory: string;
    buyercompany: any;

    constructor(
        private navCtrl: NavController,
        private loadingCtrl: LoadingController,
        private navParams: NavParams,
        public modalCtrl: ModalController,
        public mrepcdata: Mrepcdata
    ) {
        this.loadbuyercompany();
    }

    ionViewDidEnter() {
        setTimeout(() => {
            this.navParams.get('loading').dismiss();
        }, 200);
    }

    onPageLoaded() {
        this.itemlist = this.navParams.data["companyData"];
        this.itemcategory = this.navParams.data["category"];
        this.buyercompany = this.itemlist;
        console.log(this.itemlist);
    }

    loadbuyercompany() {
        return this.buyercompany;
    }

    contactSupplier(items) {
//        console.log(items);
        let modal = this.modalCtrl.create(BuyerRegisterPage, items);
        modal.present();
    }

    getItems(ev: any) {
        // Reset items back to all of the items
        this.loadbuyercompany();

        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.itemlist = this.buyercompany.filter((item) => {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        } else {
            this.onPageLoaded();
        }
    }
}

@Component({
    templateUrl: 'build/pages/buyer-company/buyer-register.html',
})
export class BuyerRegisterPage {
    contact: {name?: string, company?: string, country?: string, email?: string, message?: string} = {};
    submitted = false;
    companyItems: any;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private alertCtrl: AlertController,
        public viewCtrl: ViewController
    ) {
        this.companyItems = this.navParams.data;
        console.log(this.companyItems);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    sendemail(form) {
        this.submitted = true;

        if (form.valid) {
            let alert = this.alertCtrl.create({
              title: 'Successful Email',
              subTitle: 'Your email has been sent',
              buttons: ['OK']
            });
            alert.present();
        }
    }

}
