import {Component, ViewChild, Type} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav, NavController, ViewController, AlertController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {Mrepcdata} from './providers/mrepcdata/mrepcdata';
import {Userdata} from './providers/userdata/userdata';
import {TabsPage} from './pages/tabs/tabs';
import {HomePage} from './pages/home/home';
import {MarketplacePage} from './pages/marketplace/marketplace';
import {AlltradeshowsPage} from './pages/alltradeshows/alltradeshows';
import {SeminarPage} from './pages/seminar/seminar';
import {UserprofilePage} from './pages/userprofile/userprofile';
import {MytradeshowPage} from './pages/mytradeshow/mytradeshow';
import {MyseminarPage} from './pages/myseminar/myseminar';
import {TutorialPage} from './pages/tutorial/tutorial';
import {AboutPage} from './pages/about/about';

import {Push} from 'ionic-native';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
//import {Observable} from 'rxjs/Observable';


let component = [HomePage, MarketplacePage, AlltradeshowsPage, MytradeshowPage, AboutPage];
let userpage = [UserprofilePage];

let mymenu = ["Home", "Marketplace", "Trade Show", "My Trade Show", "Contact Us"];

@Component({
    templateUrl: 'build/app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    @ViewChild('rootNavController') navCtrl: NavController;
    app: any;

    urllink: string;
    activemenu: any = [true, false, false, false, false];

    private rootPage: Type = HomePage;

    leftsidemenu: string[];

    constructor(
        private platform: Platform,
        public mymenu: MenuController,
        public userdata: Userdata,
        public mrepcdata: Mrepcdata,
        private alertCtrl: AlertController,
        public http: Http
    ) {
        this.platform.ready().then(() => {
            StatusBar.styleDefault();
            this.registerBackButtonListener();
//            document.addEventListener('backbutton', () => {
//                let activeVC = this.nav.getActive();
//                let page = activeVC.instance;
//
//                if (!(page instanceof HomePage)) {
//                    if (!this.nav.canGoBack()) {
//                        console.log('Exiting app due to back button press at the root view');
//                        return navigator.app.exitApp();
//                    }
//                    console.log('Detected a back button press outside of tabs page - popping a view from the root navigation stack');
//                    return this.nav.pop();
//                }
//
//                let tabs = page.tabs;
//                let activeNav = tabs.getSelected();
//
//                if (!activeNav.canGoBack()) {
//                    console.log('Exiting app due to back button press at the bottom of current tab\'s navigation stack');
//                    return navigator.app.exitApp();
//                }
//
//                console.log('Detected a back button press - popping a view from the current tab\'s navigation stack');
//                return activeNav.pop();
//
//            }, false);
//            var push = Push.init({
//                android: {
//                    senderID: "583669195324"
//                },
//                ios: {
//                    alert: 'true',
//                    badge: true,
//                    sound: 'false'
//                },
//                windows: {}
//            });
//
//            push.on('registration', (datas) => {
//                this.http.get('http://107.191.60.239/regDevice.php?regdevices='+datas.registrationId.toString()).map(res => res.json()).subscribe(data => {
//                    //alert(data.status);
//                    //console.log(data.status);
//                });
//                //alert(datas.registrationId.toString());
//            });
//
//            push.on('notification', (data) => {
//                console.log(data);
//                alert(data.message);
//            });
//
//            push.on('error', (e) => {
//                console.log(e.message);
//            });
        });

        this.urllink = "http://khaujakanjohor.org/mrepc-api";
        this.loadleftsidemenu();
    }

    registerBackButtonListener() {
        document.addEventListener('backbutton', () => {
            var nav = this.getNav();
            if (nav.canGoBack()) {
                nav.pop();
            }
            else {
                this.confirmExitApp(nav);
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
            console.log(this.leftsidemenu);
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
