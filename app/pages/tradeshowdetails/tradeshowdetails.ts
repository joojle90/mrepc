import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalController, ViewController } from 'ionic-angular';
import { Mrepcdata } from '../../providers/mrepcdata/mrepcdata';
import { SupplierDetailsPage } from '../../pages/supplier-details/supplier-details';

let monthname = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

@Component({
    templateUrl: 'build/pages/tradeshowdetails/tradeshowdetails.html',
})
export class TradeshowdetailsPage {
    geteventdetails: any;
    eventstart: string;
    eventend: string;
    urllink: string;
    eventdate: string;
    showBook: Boolean;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private loadingCtrl: LoadingController,
        public modalCtrl: ModalController,
        public mrepcdata: Mrepcdata
    ) {

        this.geteventdetails = this.navParams.data;
        this.urllink = this.navParams.get('urllink');
        console.log(this.geteventdetails);

        this.eventstart = this.convertdate(this.geteventdetails.startdate);
        this.eventend = this.convertdate(this.geteventdetails.enddate);

        this.showBook = new Date(this.eventend) > new Date() ? true : false;
        console.log(this.showBook);

        if(this.eventstart.split(" ")[1] === this.eventend.split(" ")[1]) {
            this.eventdate = this.eventstart.split(" ")[0] + " to " + this.eventend;
        } else {
            this.eventdate = this.eventstart.split(" ")[0] + " " + this.eventstart.split(" ")[1] + " to " + this.eventend;
        }
    }

    convertdate(date){
        let thedate = date.split("-");
        let newdate = thedate[2].replace(/^0+/, '') +" "+ monthname[thedate[1]-1] +" "+ thedate[0];
        return newdate;
    }

    gotosupplier(supplierid) {
        let loader = this.loadingCtrl.create({ content: "Please wait..."});
        loader.present();
        setTimeout(() => {
            this.mrepcdata.getSupplierDetails(supplierid).then(data => {
                console.log(data[0])
                this.navCtrl.push(SupplierDetailsPage, {
                    companyData: data[0],
                    companyPerson: data[0].contactPerson,
                    companyProduct: data[0].latestProduct,
                    urllink: this.urllink
                });
            });
            loader.dismiss();
        }, 2500);
    }

    registerform() {
        let modal = this.modalCtrl.create(TradeshowdetailsFormPage);
        modal.present();
    }

}

@Component({
    templateUrl: 'build/pages/tradeshowdetails/tradeshowdetails-register.html',
})
export class TradeshowdetailsFormPage {
    contactSupplier: any;
    itemdetails: any;
    contact: {name?: string, company?: string, country?: string, email?: string, product?: string, message?: string} = {};
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

    register(form) {
        this.submitted = true;

        if (form.valid) {
            let alert = this.alertCtrl.create({
              title: 'Successful registration',
              subTitle: 'Your request will be process',
              buttons: ['OK']
            });
            alert.present();
        }
    }

}
