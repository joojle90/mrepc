import {Component, ViewChild, Type} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {TabsPage} from './pages/tabs/tabs';
import {HomePage} from './pages/home/home';
import {AlltradeshowsPage} from './pages/alltradeshows/alltradeshows';
import {Mrepcdata} from './providers/mrepcdata/mrepcdata';


let component = [HomePage, AlltradeshowsPage];

@Component({
    templateUrl: 'build/app.html'
})

export class MyApp {
    @ViewChild(Nav) nav: Nav;

    private rootPage: Type = HomePage;
     
    leftsidemenu: any;

    constructor(
        private platform: Platform,
        public mymenu: MenuController,
        public mrepcdata: Mrepcdata
    ) {       
        platform.ready().then(() => {
            StatusBar.styleDefault();
        });
        
        this.loadleftsidemenu();
    }
     
    loadleftsidemenu() {
        return this.mrepcdata.getLeftsidemenu().then(data => {
            this.leftsidemenu = data;
        })
    }

    openPage(pageid) {
        console.log(pageid);
        this.nav.setRoot(component[pageid]);
    }
}

ionicBootstrap(MyApp, [Mrepcdata], { });

