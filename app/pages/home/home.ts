import {Component} from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    constructor(
        private navCtrl: NavController,
        private loadingCtrl: LoadingController
        ) {

    }
    
    presentLoadingDefault() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();

        setTimeout(() => {
            loading.dismiss();
        }, 5000);
    }
}
