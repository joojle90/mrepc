import { Component, ViewChild, Type } from '@angular/core';
import { Platform, ionicBootstrap, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { CinemarData } from './providers/cinemar-data/cinemar-data';
import { TabsPage } from './pages/tabs/tabs';
import { NowshowingPage } from './pages/nowshowing/nowshowing';
import { PromotionPage } from './pages/promotion/promotion';
import { FastticketPage } from './pages/fastticket/fastticket';
import { CinemaPage } from './pages/cinema/cinema';
import { ComingsoonPage } from './pages/comingsoon/comingsoon';
import { FaqsPage } from './pages/faqs/faqs';
import { AboutPage } from './pages/about/about';

let component = [TabsPage, PromotionPage, FastticketPage, CinemaPage,
                 ComingsoonPage, FaqsPage, AboutPage];
let mymenu = ["Home", "Promotion", "Fast Ticket", "Cinema", "Coming Soon",
                 "FAQs", "About Us"];

@Component({
    templateUrl: 'build/app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    urllink: string;
    activemenu: any = [true, false, false, false, false, false, false];

    private rootPage: Type = TabsPage;

    leftsidemenu: string[];

    constructor(
        private platform: Platform,
        public mymenu: MenuController,
        public cinemardata: CinemarData
    ) {
        platform.ready().then(() => {
            StatusBar.styleDefault();
        });

        //this.urllink = "http://cinemar.myxscan.net/api/Movie/";
        this.loadleftsidemenu();
    }

    loadleftsidemenu() {
        return this.cinemardata.getLeftsidemenu().then(data => {
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
        this.nav.setRoot(component[pageid]);
    }
}

ionicBootstrap(MyApp, [CinemarData], { tabsHideOnSubPages:"true" });
