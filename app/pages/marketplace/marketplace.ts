import { Component, Type } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BuyerPage } from '../../pages/buyer/buyer';
import { SupplierPage} from '../../pages/supplier/supplier';

/*
  Generated class for the MarketplacePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'build/pages/marketplace/marketplace.html',
})
export class MarketplacePage {
    tab1Root: any;
    tab2Root: any;
    urllink: string;
//    private rootPage: Type = BuyerPage;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams
    ) {
        this.tab1Root = BuyerPage;
        this.tab2Root = SupplierPage;
        this.urllink = this.navParams.get('urllink');
    }

}
