import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalController, ViewController } from 'ionic-angular';
import { Mrepcdata } from '../../providers/mrepcdata/mrepcdata';
import { BuyerCompanyPage } from '../../pages/buyer-company/buyer-company';


@Component({
    templateUrl: 'build/pages/buyer-items/buyer-items.html',
})
export class BuyerItemsPage {
    getitemlist: any;
    itemlisttitle: string;
    catId: string;
    urllink: string;

    constructor(
        private navCtrl: NavController,
        private loadingCtrl: LoadingController,
        private navParams: NavParams,
        public modalCtrl: ModalController,
        public mrepcdata: Mrepcdata
    ) {
    }

    onPageLoaded() {
        this.catId = this.navParams.data["buyerCatId"];
        this.itemlisttitle = this.navParams.data["buyerCategory"];
        this.getitemlist = this.navParams.data.buyerItems.sort((a,b) => {
            return a.item.localeCompare(b.item);
        });
        console.log(this.getitemlist);
        console.log(this.catId);
    }

    buyerCompany(catId, items) {
        let loader = this.loadingCtrl.create({ content: "Please wait..."});
        loader.present().then(() => {
            this.mrepcdata.getBuyerCompany(catId, items.item_id).then(data => {
                this.navCtrl.push(BuyerCompanyPage, {
                    companyData: data,
                    category: items.item,
                    urllink: this.urllink,
                    loading: loader
                });
            });
        });
    }

}
