import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
    tab1Root: any = BuyerPage;
    tab2Root: any = SupplierPage;

    constructor(
        private navCtrl: NavController
    ) {

        this.navCtrl = navCtrl;
    }

}
