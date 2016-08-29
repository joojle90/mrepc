import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Mrepcdata} from '../../providers/mrepcdata/mrepcdata';

/*
  Generated class for the AlltradeshowsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'build/pages/alltradeshows/alltradeshows.html',
})
export class AlltradeshowsPage {

    eventlist: any;

    constructor(
        private navCtrl: NavController,
        public mrepcdata: Mrepcdata
    ) {

        this.mrepcdata.geteventlist('all', 'all').then(data => {
            this.eventlist = data;
        })
    }
}
