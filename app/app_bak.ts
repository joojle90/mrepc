import {Component, ViewChild, Type} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav, NavController, ViewController, AlertController} from 'ionic-angular';
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

    private rootPage: Type = UseraccountPage;

    leftsidemenu: string[];

    constructor(
        private platform: Platform,
        public mymenu: MenuController,
        public userdata: Userdata,
        public mrepcdata: Mrepcdata,
        private alertCtrl: AlertController,
//        private config: ConfigService, private nfc: NfcService,
//        public events: Events, private translate: TranslateService,
//        private fetch: ConfigFetchService,
        public http: Http
    ) {
        this.platform.ready().then(() => {

            // Here we will check if the user is already logged in
            // because we don't want to ask users to log in each time they open the app
            let env = this;
            NativeStorage.getItem('user')
            .then( function (data) {
                console.log(data);
            // user is previously logged and we have his data
            // we will let him access the app
            env.nav.push(UseraccountPage);
                Splashscreen.hide();
            }, function (error) {
            //we don't have the user data so we will ask him to log in
            env.nav.setRoot(UserprofilePage);
                Splashscreen.hide();
            });

            StatusBar.styleDefault();
            this.platform.registerBackButtonAction(() => {
            let activeVC = this.nav.getActive();
            let page = activeVC.instance;

            if (!(page instanceof HomePage)) {
                if (!this.nav.canGoBack()) {
//                    alert('test1');
//                    return navigator.app.exitApp();
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

//            let confirm = this.alertCtrl.create({
//                title: 'Confirm Exit',
//                message: 'Really exit app?',
//                buttons: [{
//                    text: 'Cancel'
//                },{
//                    text: 'Exit',
//                    handler: () => {
//                        navigator.app.exitApp();
//                    }
//                }]
//            });
//            confirm.present();
            //        navigator.app.exitApp();
            });

//         platform.registerBackButtonAction(() => {
//            let activeVC = this.nav.getActive();
//        let page = activeVC.instance;
//        if (page instanceof TabsPage) {
//          try {
//            const portal = navigator.app._appRoot._getPortal();
//            if (portal.length() == 0) {
//                // no overlay
//                // do something  you want
//        let alert = this.alertCtrl.create({
//          title: 'Message',
//          subTitle: 'Stay',
//          buttons: ['OK']
//        });
//        alert.present();
//            }
//          } catch (e) {
//        let alert = this.alertCtrl.create({
//          title: 'Message',
//          subTitle: 'Exit',
//          buttons: ['OK']
//        });
//        alert.present();
//          }
//        }
//        //  the default handler
//        navigator.app.navPop();
//         });
//            this.registerBackButtonListener();
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
