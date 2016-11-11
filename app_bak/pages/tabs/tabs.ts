import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NowshowingPage } from '../../pages/nowshowing/nowshowing';
import { TophitsPage } from '../../pages/tophits/tophits';
import { CategoryPage } from '../../pages/category/category';

/*
  Generated class for the TabsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'build/pages/tabs/tabs.html',
})
export class TabsPage {
    tab1Root: any;
    tab2Root: any;
    tab3Root: any;
    urllink: string;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams
    ) {
        this.tab1Root = NowshowingPage;
        this.tab2Root = TophitsPage;
        this.tab3Root = CategoryPage;
        this.urllink = this.navParams.get('urllink');
    }

}
