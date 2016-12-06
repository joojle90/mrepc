import {Component, ViewChild, Type} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
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


let component = [HomePage, MarketplacePage, AlltradeshowsPage, MytradeshowPage, AboutPage];
let userpage = [UserprofilePage];

let mymenu = ["Home", "Marketplace", "Trade Show", "My Trade Show", "Contact Us"];

@Component({
    templateUrl: 'build/app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    urllink: string;
    activemenu: any = [true, false, false, false, false, false];

    private rootPage: Type = HomePage;

    leftsidemenu: string[];

    constructor(
        private platform: Platform,
        public mymenu: MenuController,
        public userdata: Userdata,
        public mrepcdata: Mrepcdata
    ) {
        platform.ready().then(() => {
            StatusBar.styleDefault();
        });

        this.urllink = "http://khaujakanjohor.org/mrepc-api";
        this.loadleftsidemenu();
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
