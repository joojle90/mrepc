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


let component = [HomePage, AlltradeshowsPage, MarketplacePage, SeminarPage, TutorialPage, AboutPage];
let userpage = [UserprofilePage, MytradeshowPage, MyseminarPage];

@Component({
    templateUrl: 'build/app.html'
})

export class MyApp {
    @ViewChild(Nav) nav: Nav;
    urllink: string;

    private rootPage: Type = HomePage;
     
    leftsidemenu: any;

    constructor(
        private platform: Platform,
        public mymenu: MenuController,
        public mrepcdata: Mrepcdata,
        public userdata: Userdata
    ) {       
        platform.ready().then(() => {
            StatusBar.styleDefault();
        });
        
        this.urllink = "http://techapp.info/mrepc-api";
        this.loadleftsidemenu();
    }
     
    loadleftsidemenu() {
        return this.mrepcdata.getLeftsidemenu().then(data => {
            this.leftsidemenu = data;
        })
    }

    openPage(pageid) {
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

ionicBootstrap(MyApp, [Mrepcdata, Userdata], { });

