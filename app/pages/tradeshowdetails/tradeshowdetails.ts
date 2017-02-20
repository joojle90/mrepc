import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalController, ViewController, SqlStorage, Storage } from 'ionic-angular';
import { Mrepcdata } from '../../providers/mrepcdata/mrepcdata';
import { SupplierDetailsPage } from '../../pages/supplier-details/supplier-details';
//import { Storage } from '@ionic/storage';

let monthname = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

@Component({
    templateUrl: 'build/pages/tradeshowdetails/tradeshowdetails.html'
})
export class TradeshowdetailsPage {
    geteventdetails: any;
    eventstart: string;
    eventend: string;
    urllink: string;
    eventdate: string;
    showBook: Boolean;
    participantdata: any = [];
    userList: any = [];
    showLogin: Boolean = true;
//    showLogin: Boolean = false;

    private storage: Storage;
    public bookmarkList: Array<Object>;
    public bookmarkListById: any;

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

        let oneDay = 24*60*60*1000;
        let diffDays = Math.round(Math.abs((new Date(this.eventstart).getTime() - new Date().getTime())/(oneDay)));
        let nowdate = new Date();
        let five_months = new Date(nowdate.getFullYear(),nowdate.getMonth()+6,nowdate.getDay());
        console.log(five_months);

        this.showBook = (new Date(this.eventend) > new Date()) && (new Date(this.eventend)) < five_months ? true : false;
        console.log(this.showBook+" and "+diffDays+" days");

        if(this.eventstart.split(" ")[1] === this.eventend.split(" ")[1]) {
            this.eventdate = this.eventstart.split(" ")[0] + " to " + this.eventend;
        } else {
            this.eventdate = this.eventstart.split(" ")[0] + " " + this.eventstart.split(" ")[1] + " to " + this.eventend;
        }


        this.storage = new Storage(SqlStorage);
        this.storage.query("CREATE TABLE IF NOT EXISTS eventbook (eventid INTEGER PRIMARY KEY, location TEXT)");
        this.bookmarkList = [];
        this.bookmarkListById = [];
    }

    onPageLoaded() {
        this.loadparticipantdata(this.navParams.get('eventid'));
        console.log(this.navParams.get('eventid'));
        this.refresh();

        this.selectDataById(this.navParams.get('eventid'));
    }

    convertdate(date){
        let thedate = date.split("-");
        let newdate = thedate[2].replace(/^0+/, '') +" "+ monthname[thedate[1]-1] +" "+ thedate[0];
        return newdate;
    }

    loadparticipantdata(eventid) {
        return this.mrepcdata.getParticipantData(eventid).then(data => {
//            this.participantdata = data.sort((a,b) => {
//                return a.name.localeCompare(b.name);
//            });
//            this.participantdata = this.participantdata[0];
            this.participantdata = data;
        });
    }

    gotosupplier(supplierid) {
        let loader = this.loadingCtrl.create({ content: "Please wait..."});
        loader.present().then(() => {
            this.mrepcdata.getSupplierDetails(supplierid).then(data => {
                console.log(data[0])
                this.navCtrl.push(SupplierDetailsPage, {
                    companyData: data[0],
                    companyPerson: data[0].contactPerson,
                    companyProduct: data[0].latestProduct,
                    urllink: this.urllink,
                    loading: loader
                });
            });
        });
    }

    registerform() {
        let modal = this.modalCtrl.create(TradeshowdetailsFormPage);
        modal.present();
    }

    additem(eventid, location) {
        this.storage.query("INSERT INTO eventbook (eventid, location) VALUES (?, ?)", [eventid, location]).then((data) => {
            this.bookmarkList.push({
                "eventid": eventid,
                "location": location
            });
            this.onPageLoaded();
        }, (error) => {
            this.storage.query("DELETE FROM eventbook WHERE eventid ="+eventid);
            this.bookmarkListById = [];
            console.log(error);
        });
    };

    refresh() {
        this.storage.query("SELECT * FROM eventbook").then((data) => {
            if(data.res.rows.length > 0) {
                this.bookmarkList = [];
                for(let i = 0; i < data.res.rows.length; i++) {
                    this.bookmarkList.push({
                        "eventid": data.res.rows.item(i).eventid,
                        "location": data.res.rows.item(i).location,
                    });
                }
            }
        }, (error) => {
            console.log(error);
        });


        this.storage.query("SELECT * FROM user").then((data) => {
            if(data.res.rows.length > 0) {
                this.userList = [];
                for(let i = 0; i < data.res.rows.length; i++) {
                    this.userList.push({
                        "token": data.res.rows.item(i).id,
                        "username": data.res.rows.item(i).username,
                        "image": data.res.rows.item(i).image,
                        "email": data.res.rows.item(i).email
                    });
                }

                if(this.userList.length > 0) {
                    this.showLogin = true;
                } else {
                    this.showLogin = false;
                }
                console.log(this.userList);
            }
        }, (error) => {
            console.log(error);
        });
    }

    selectDataById(eventid) {
        this.storage.query("SELECT * FROM eventbook WHERE eventid="+eventid).then((data) => {
            if(data.res.rows.length > 0) {
                this.bookmarkListById = [];
                for(let i = 0; i < data.res.rows.length; i++) {
                    this.bookmarkListById.push({
                        "eventid": data.res.rows.item(i).eventid,
                        "location": data.res.rows.item(i).location,
                    });
                }
                console.log(this.bookmarkListById);
            }
        }, (error) => {
            console.log(error);
        });
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
              subTitle: 'Your request will be processed',
              buttons: ['OK']
            });
            alert.present();
        }
    }

}
