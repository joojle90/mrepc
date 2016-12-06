import { Component, Directive, ElementRef, Input } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalController, ViewController } from 'ionic-angular';

/*
  Generated class for the SupplierDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Directive({
  selector: '[imageLoader]'
})
@Component({
    templateUrl: 'build/pages/supplier-details/supplier-details.html',
})
export class SupplierDetailsPage {
    getsupplierdetails: any;
    getsupplieritems: any;
    urllink: string;
    @Input() imageLoader;

    constructor(
        private navCtrl: NavController,
        private loadingCtrl: LoadingController,
        private navParams: NavParams,
        public modalCtrl: ModalController,
        private el: ElementRef
    ) {
    }

    ionViewDidEnter() {
        setTimeout(() => {
            this.navParams.get('loading').dismiss();
        }, 200);
    }

    onPageLoaded() {
        this.getsupplierdetails = this.navParams.data;
        this.urllink = this.navParams.get('urllink');
        this.getsupplieritems = this.getsupplierdetails.companyProduct;

        this.getsupplieritems = this.getsupplierdetails.companyProduct.sort((a,b) => {
            return a.productName.localeCompare(b.productName);
        });
    }
    contactSupplier(items) {
        console.log(items);
        let modal = this.modalCtrl.create(SupplierItemsPage, items, this.getsupplierdetails.companyPerson);
        modal.present();
    }
    registerforitem(items) {
        console.log(items);
        let modal = this.modalCtrl.create(SupplierRegisterPage);
        modal.present();
    }

}

@Component({
    templateUrl: 'build/pages/supplier-details/supplier-items.html',
})
export class SupplierItemsPage {
    contactSupplier: any;
    itemdetails: any;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private alertCtrl: AlertController,
        public viewCtrl: ViewController
    ) {
        this.contactSupplier = this.navParams.data.companyPerson;
        this.itemdetails = this.navParams.data;
        console.log(this.navParams.data);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}

@Component({
    templateUrl: 'build/pages/supplier-details/supplier-register.html',
})
export class SupplierRegisterPage {
    contact: {name?: string, company?: string, country?: string, email?: string, message?: string} = {};
    submitted = false;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private alertCtrl: AlertController,
        public viewCtrl: ViewController
    ) {
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
