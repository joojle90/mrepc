import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavParams, NavController, AlertController, Platform, LoadingController, Nav, SqlStorage, Storage, ViewController, ModalController} from 'ionic-angular';
import {Mrepcdata} from '../../providers/mrepcdata/mrepcdata';
import {TradeshowdetailsPage} from '../../pages/tradeshowdetails/tradeshowdetails';
import {MarketplacePage} from '../../pages/marketplace/marketplace';
import {AlltradeshowsPage} from '../../pages/alltradeshows/alltradeshows';
import {SeminarPage} from '../../pages/seminar/seminar';
import {UseraccountPage} from '../../pages/useraccount/useraccount';
import {TutorialPage} from '../../pages/tutorial/tutorial';
import {StatusBar, Facebook, NativeStorage, Splashscreen} from 'ionic-native';

let menubutton = [MarketplacePage, TutorialPage, SeminarPage];
let monthname = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    @ViewChild('imgtest') imgtest: ElementRef;
    @ViewChild(Nav) nav: Nav;

    mastermenu: any;
    comingsoonevent: any;
    comingsooneventData: any;
    homeOptions: any;
    imageurl: string;
    eventstart: string;
    urllink: string;
    imagelink: string;
    userList: any = [];
    isLogin: Boolean;

    private storage: Storage;

    constructor(
        private platform: Platform,
        private navCtrl: NavController,
        private loadingCtrl: LoadingController,
        public modalCtrl: ModalController,
        public mrepcdata: Mrepcdata
        ) {

        this.homeOptions = {
            initialSlide: 0,
            autoplay: 3500,
            autoplayDisableOnInteraction: false,
            loop: true
        };
        this.urllink = "http://www.mrepc.com/intranet/mobile_apps/images/banner";
        this.imagelink = "http://110.74.131.116:8181/mrepc-api";
        this.presentLoadingData();
    }

    onPageWillEnter() {
        this.storage = new Storage(SqlStorage);
        this.storage.query("CREATE TABLE IF NOT EXISTS user (fbid TEXT PRIMARY KEY, email TEXT, name TEXT, firstname TEXT, lastname TEXT, gender TEXT)");
        this.refresh();

        console.log(this.userList);
    }

    refresh() {
        this.storage.query("SELECT * FROM user").then((data) => {
            if(data.res.rows.length > 0) {
                this.userList = [];
                for(let i = 0; i < data.res.rows.length; i++) {
                    this.userList.push({
                        "fbid": data.res.rows.item(i).fbid,
                        "email": data.res.rows.item(i).email,
                        "name": data.res.rows.item(i).name,
                        "firstname": data.res.rows.item(i).firstname,
                        "lastname": data.res.rows.item(i).lastname,
                        "gender": data.res.rows.item(i).gender
                    });
                }
                this.isLogin = true;
            } else {
                this.isLogin = false;
            }
        }, (error) => {
            console.log(error);
        });
    }

    doRefresh(refresher) {
        console.log('Begin async operation', refresher);

        setTimeout(() => {
            console.log('Async operation has ended');
            this.presentLoadingData();
            refresher.complete();
        }, 2000);
    }

    loadHomemenu() {
        this.loadComingsoonMenu();
        return this.mrepcdata.getMastermenu().then(data => {
            this.mastermenu = data;
        });
    }

    loadComingsoonMenu() {
        return this.mrepcdata.geteventcriteria('6', '1').then(data => {
            this.comingsoonevent = data.filter(newdata => {
                let setdate = new Date (newdata.eventdetail.startdate);
                return setdate > new Date();
            });
            this.comingsoonevent = this.comingsoonevent.sort((a,b) => {
                let datea = new Date (a.eventdetail.startdate);
                let dateb = new Date (b.eventdetail.startdate);
                return datea > dateb ? 1 : -1;
            });
            this.comingsoonevent = this.comingsoonevent.slice(0,5);
            console.log(this.comingsoonevent);
        });
    }

    loadTest() {
        this.mrepcdata.geteventcriteria('6', '1').then(data => {
            this.comingsooneventData = data.filter(newdata => {
                let setdate = new Date (newdata.eventdetail.startdate);
                return setdate > new Date();
            });
            this.comingsooneventData = this.comingsoonevent.slice(0,5);
        });
    }

    tradeshowspage(page) {
        let picture = page.banner;
        this.navCtrl.push(TradeshowdetailsPage, {
            eventid: page.idlist,
            eventpic: picture,
            startdate: page.eventdetail.startdate,
            enddate: page.eventdetail.enddate,
            location: page.eventdetail.location,
            email: page.eventdetail.email,
            website: page.eventdetail.linkurl,
            eventdetails: page.eventdetail,
            urllink: this.urllink
        });
    }

    openmenuPage(pageid) {
        this.navCtrl.push(menubutton[pageid], {
            urllink: this.imagelink
        });
    }

    useraccountPage(loginStatus) {
        if(loginStatus) {
            let modal = this.modalCtrl.create(UseraccountProfilePage);
            modal.present();
        } else {
            this.navCtrl.push(UseraccountPage);
        }
    }
    
    presentLoadingData() {
        setTimeout(() => {
            let loader = this.loadingCtrl.create({ content: "Please wait..." });
            loader.present();

            this.loadHomemenu().then(() => {
                loader.dismiss();
            });
        }, 0);
    }

    convertdate(date){
        let thedate = date.split("-");
        let newdate = thedate[2] +" "+ monthname[thedate[1]-1] +" "+ thedate[0];
        return newdate;
    }
}


@Component({
    templateUrl: 'build/pages/home/useraccount-profile.html',
})
export class UseraccountProfilePage {
    profile: {fbid?: string, username?: string, email?: string, gender?: string} = {};
//    username: string;
//    email: string;
//    gender: string;
    imageurl: string;
    public userList: any = [];

    private storage: Storage;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private alertCtrl: AlertController,
        public viewCtrl: ViewController
    ) {

        this.storage = new Storage(SqlStorage);
        this.userList = [];
        this.refresh();
    }

    refresh() {
        this.storage.query("SELECT * FROM user").then((data) => {
            if(data.res.rows.length > 0) {
                this.userList = [];
                for(let i = 0; i < data.res.rows.length; i++) {
                    this.userList.push({
                        "fbid": data.res.rows.item(i).fbid,
                        "email": data.res.rows.item(i).email,
                        "name": data.res.rows.item(i).name,
                        "firstname": data.res.rows.item(i).firstname,
                        "lastname": data.res.rows.item(i).lastname,
                        "gender": data.res.rows.item(i).gender
                    });
                }
                if(this.userList.length > 0) {
                    this.profile.username = this.userList[0].name;
                    this.profile.email = this.userList[0].email;
                    this.profile.gender = this.userList[0].gender;
                    this.imageurl = "https://graph.facebook.com/"+this.userList[0].fbid+"/picture?type=normal";
                    this.profile.fbid = this.userList[0].fbid;
                } else {
                    console.log(this.userList);
                }
            }
        }, (error) => {
            console.log(error);
        });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    logout(fbid) {
//        alert(fbid);
        let confirm = this.alertCtrl.create({
            title: 'Exit App',
            message: 'Do you want to logout facebook?',
            buttons: [{
                text: 'Cancel'
            },{
                text: 'Yes',
                handler: () => {
                    this.storage.query("DELETE FROM user WHERE fbid ="+fbid);
                    this.navCtrl.setRoot(HomePage);
                }
            }]
        });
        confirm.present();
    }

}
