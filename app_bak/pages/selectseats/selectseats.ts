import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, ViewController } from 'ionic-angular';
import { CinemarData } from '../../providers/cinemar-data/cinemar-data';

@Component({
    templateUrl: 'build/pages/selectseats/selectseats.html',
})
export class SelectseatsPage {
    totalticket: number;

    constructor(
        private navCtrl: NavController,
        private alertCtrl: AlertController,
        private navParams: NavParams,
        public modalCtrl: ModalController,
        public cinemardata: CinemarData
    ) {
        this.totalticket = this.navParams.data['totalticket'];
        console.log(this.navParams.data);
    }

    loadreviewticket() {
        return this.cinemardata.getMovielist().then(data => {

        });
    }

    payment() {
        let alert = this.alertCtrl.create({
          title: 'Pay for ticket',
          subTitle: 'We will direct to our payment page',
          buttons: ['OK']
        });

        let confirm = this.alertCtrl.create({
            title: 'Need Payment',
            message: 'Do you want to proceed for payment',
            buttons: [{
                text: 'No',
                handler: () => {
                    console.log('Disagree clicked');
                }
            },{
                text: "I'm okay",
                handler: () => {
                    confirm.dismiss().then(() => {
                        alert.present();
                    });
                }
            }]
        });
        confirm.present();
    }

    viewticket() {
        let modal = this.modalCtrl.create(ViewticketPage);

        let alert = this.alertCtrl.create({
            title: 'Preview ticket',
            subTitle: 'Please check your ticket',
            buttons: [{
                text: 'OK',
                handler: () => {
                    modal.present();
                }
            }]
        });

        let confirm = this.alertCtrl.create({
            title: 'Book your ticket',
            message: 'Proceed to book the seats?',
            buttons: [{
                text: 'No',
                handler: () => {
                    console.log('Disagree clicked');
                }
            },{
                text: "Yes, Sure",
                handler: () => {
                    confirm.dismiss().then(() => {
                        alert.present();
                    });
                }
            }]
        });
        confirm.present();
    }
}

@Component({
    templateUrl: 'build/pages/selectseats/selectseats-viewticket.html',
})
export class ViewticketPage {
    totalticket: number;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private alertCtrl: AlertController,
        public viewCtrl: ViewController
    ) {
        this.totalticket = this.navParams.data['totalticket'];
        console.log(this.totalticket);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}
