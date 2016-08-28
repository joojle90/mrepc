import {Component, ViewChild, Type} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {TabsPage} from './pages/tabs/tabs';
import {HomePage} from './pages/home/home';
import {ContactPage} from './pages/contact/contact';
import {Mrepcdata} from './providers/mrepcdata/mrepcdata';


let component = [HomePage, ContactPage];

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
        
        this.updateleftsidemenu();
    }
     
    updateleftsidemenu() {
        return this.mrepcdata.getLeftsidemenu('leftsidemenu').then(data => {
            this.leftsidemenu = data;
        })
    }

    openPage(page) {
        console.log(page.idmenu-1);
        this.nav.setRoot(component[page.idmenu-1]);
    }
}

ionicBootstrap(MyApp, [Mrepcdata], { });

