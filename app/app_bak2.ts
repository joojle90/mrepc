import {Component, ViewChild, Type} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, LoadingController, Nav, NavController, ViewController, AlertController, SqlStorage, Storage, Events} from 'ionic-angular';
import {StatusBar, Facebook, NativeStorage, Splashscreen} from 'ionic-native';
import {Mrepcdata} from './providers/mrepcdata/mrepcdata';
import {Userdata} from './providers/userdata/userdata';
import {TabsPage} from './pages/tabs/tabs';
import {HomePage} from './pages/home/home';
import {MarketplacePage} from './pages/marketplace/marketplace';
import {AlltradeshowsPage} from './pages/alltradeshows/alltradeshows';
import {SeminarPage} from './pages/seminar/seminar';
import {UserprofilePage} from './pages/userprofile/userprofile';
import {UseraccountPage} from './pages/useraccount/useraccount';
import {MytradeshowPage} from './pages/mytradeshow/mytradeshow';
import {MyseminarPage} from './pages/myseminar/myseminar';
import {TutorialPage} from './pages/tutorial/tutorial';
import {AboutPage} from './pages/about/about';

import {Push} from 'ionic-native';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
//import {Observable} from 'rxjs/Observable';


let component = [HomePage, MarketplacePage, AlltradeshowsPage, MytradeshowPage, AboutPage];
let userpage = [UseraccountPage];

let mymenu = ["Home", "Marketplace", "Trade Show", "My Trade Show", "Contact Us"];

@Component({
    templateUrl: 'build/app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    @ViewChild('rootNavController') navCtrl: NavController;
    app: any;
    showLogin: Boolean = false;
//    hidemenu: String = "";
    hidemenu: string = "MyTradeshowPage";
    username: string;
    email: string;
    imageurl: string;

    urllink: string;
    activemenu: any = [true, false, false, false, false];
    userList: any = [];

    private storage: Storage;

    private rootPage: Type = HomePage;

    leftsidemenu: string[];

    constructor(
        private platform: Platform,
        public mymenu: MenuController,
        public userdata: Userdata,
        public mrepcdata: Mrepcdata,
        private events: Events,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        public http: Http
    ) {
        this.platform.ready().then(() => {

            this.events.subscribe('user:signin', () => {
                let loader = this.loadingCtrl.create({ content: "Please wait..." });
                loader.present();
                setTimeout(() => {
                    location.reload();
                    loader.dismiss();
                }, 2000);
            });

            StatusBar.styleDefault();
            this.platform.registerBackButtonAction(() => {
                let activeVC = this.nav.getActive();
                let page = activeVC.instance;

                if (!(page instanceof HomePage)) {
                    if (!this.nav.canGoBack()) {
                        let confirm = this.alertCtrl.create({
                            title: 'Exit App',
                            message: 'Do you want to exit the app?',
                            buttons: [{
                                text: 'Cancel'
                            },{
                                text: 'Exit',
                                handler: () => {
                                    navigator.app.exitApp();
                                }
                            }]
                        });
                        confirm.present();
                    }
    //                alert('test2');
                    return this.nav.pop();
                } else {
                    let confirm = this.alertCtrl.create({
                        title: 'Exit App',
                        message: 'Do you want to exit the app?',
                        buttons: [{
                            text: 'Cancel'
                        },{
                            text: 'Exit',
                            handler: () => {
                                navigator.app.exitApp();
                            }
                        }]
                    });
                    confirm.present();
                }
            });
        });

//        this.urllink = "http://khaujakanjohor.org/mrepc-api";
        this.urllink = "http://110.74.131.116:8181/mrepc-api";

        this.storage = new Storage(SqlStorage);
        this.refresh();
        this.loadleftsidemenu();

//        let env = this;
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
                console.log(this.userList);
                if(this.userList.length > 0) {
                    this.showLogin = true;
                    this.username = this.userList[0].name;
                    this.email = this.userList[0].email;
                    this.imageurl = "https://graph.facebook.com/"+this.userList[0].fbid+"/picture?type=normal";
                    this.hidemenu = "";
                } else {
                    this.showLogin = false;
                    this.hidemenu = "MyTradeshowPage";
                }
            }
        }, (error) => {
            console.log(error);
        });
    }

    registerBackButtonListener() {
        document.addEventListener('backbutton', () => {
            var nav = this.getNav();
            if (nav.canGoBack()) {
//                nav.pop();
                let alert = this.alertCtrl.create({
                  title: 'Message',
                  subTitle: 'Stay',
                  buttons: ['OK']
                });
                alert.present();
            }
            else {
//                this.confirmExitApp(nav);
                let alert = this.alertCtrl.create({
                  title: 'Message',
                  subTitle: 'Exit',
                  buttons: ['OK']
                });
                alert.present();
            }
        });
    }

    confirmExitApp(nav) {
        let confirm = this.alertCtrl.create({
            title: 'Confirm Exit',
            message: 'Really exit app?',
            buttons: [{
                text: 'Cancel',
                handler: () => {
                    console.log('Disagree clicked');
                }
            },{
                text: 'Exit',
                handler: () => {
                    navigator.app.exitApp();
                }
            }]
        });
        nav.present(confirm);
    }

    getNav() {
        return this.app.getComponent('nav');
    }


    loadleftsidemenu() {
        return this.mrepcdata.getLeftsidemenu().then(data => {
            this.leftsidemenu = data;
//            console.log(this.leftsidemenu);
        })
    }

    openPage(mypage: any) {
        let pageid;
        for (var i in mymenu) {
            if(mymenu[i] === mypage) {
                this.activemenu[i] = true;
                pageid = i;
            } else {
                this.activemenu[i] = false;
            }
        }
        this.nav.setRoot(component[pageid], {
            urllink: this.urllink
        });
    }

    userPage(pageid) {
        this.nav.setRoot(userpage[pageid], {
            urllink: this.urllink
        });
    }
}

ionicBootstrap(MyApp, [Mrepcdata, Userdata], { tabsHideOnSubPages:"true" });
