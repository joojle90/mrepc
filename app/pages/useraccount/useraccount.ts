import { Component, Type } from '@angular/core';
import { NavController, AlertController, Platform, LoadingController, SqlStorage, Storage, Events, ViewController, ModalController } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';
import { HomePage } from '../home/home';
import { Userdata } from '../../providers/userdata/userdata';
import { MyApp } from '../../app';

import {Http,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the UseraccountPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var window: any;
@Component({
//    templateUrl: 'build/pages/useraccount/useraccount.html',
    template: '<ion-nav [root]="rootPage" swipeBackEnabled="false"></ion-nav>',
})
export class UseraccountPage {
    login: {username?: string, password?: string} = {};
    submitted = false;
    public userList: Array<Object>;
    facebookId: string;

    private storage: Storage;

    private rootPage: Type = HomePage;

    constructor(
        private navCtrl: NavController,
        private alertCtrl: AlertController,
        private platform: Platform,
        private loadingCtrl: LoadingController,
        public userData: Userdata,
        private events: Events,
        public modalCtrl: ModalController,
        public http:Http
    ) {

        this.storage = new Storage(SqlStorage);
        this.userList = [];

        this.fbLogin();
    }

    fbLogin() {
//        this.storage.query("INSERT INTO user (fbid, email, name, firstname, lastname, gender) VALUES (?, ?, ?, ?, ?, ?)", ["12345", "apa@gmail.com", "mrepcname", "firstname", "lastname", "male"]).then((data) => {
//            this.userList.push({
//                "fbid": "12345",
//                "email": "apa@gmail.com",
//                "name": "mrepcname",
//                "firstname": "firstname",
//                "lastname": "lastname",
//                "gender": "male"
//            });
//            console.log("INSERTED: " + JSON.stringify(data));
//            this.events.publish('user:signin');
//        }, (error) => {
//            console.log(error);
//        });

        this.platform.ready().then(() => {
            this.facebookLogin().then(success => {
//                alert(success.access_token);
                this.http.get('http://110.74.131.116:8181/mrepc-api/registrationDevices?idreg='+success.access_token).map(res => res.json()).subscribe(data => {
//                        alert("Thank you for join with us");
//                        alert("token="+success.access_token);
                });

                this.http.get('https://graph.facebook.com/me?fields=id,email,name,first_name,last_name,gender&access_token='+success.access_token).map(res => res.json()).subscribe(datafb => {
//                    alert(datafb.id+" "+datafb.name+" "+datafb.email+" "+datafb.first_name+" "+datafb.last_name+" "+datafb.gender+" "+datafb.hometown+" "+datafb.birthday);
                    alert("Thank you for join with us");

                    this.storage.query("INSERT INTO user (fbid, email, name, firstname, lastname, gender) VALUES (?, ?, ?, ?, ?, ?)", [datafb.id, datafb.email, datafb.name, datafb.firstname, datafb.lastname, datafb.gender]).then((data) => {
                        this.userList.push({
                            "fbid": datafb.id,
                            "email": datafb.email,
                            "name": datafb.name,
                            "firstname": datafb.firstname,
                            "lastname": datafb.lastname,
                            "gender": datafb.gender
                        });
                        console.log("INSERTED: " + JSON.stringify(data));
                        this.events.publish('user:signin');
                    }, (error) => {
                        console.log(error);
                    });
                });
            }, (error) => {
                alert(error);
            });
        });
    }

    facebookLogin(): Promise<any> {
        return new Promise(function(resolve, reject) {
            console.log(window);
            var browserRef = window.cordova.InAppBrowser.open("https://www.facebook.com/v2.0/dialog/oauth?client_id=" + "1095663003854295" + "&redirect_uri=http://localhost/callback&response_type=token&scope=email", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");

            browserRef.addEventListener("loadstart", (event) => {
                if ((event.url).indexOf("http://localhost/callback") === 0) {
                    browserRef.removeEventListener("exit", (event) => {});
                    browserRef.close();

                    var responseParameters = ((event.url).split("#")[1]).split("&");
                    var parsedResponse = {};
                    for (var i = 0; i < responseParameters.length; i++) {

//                        alert(responseParameters[i]);

                        parsedResponse[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                    }

                    if (parsedResponse["access_token"] !== undefined && parsedResponse["access_token"] !== null) {
                        resolve(parsedResponse);
                    } else {
//                        reject("Problem authenticating with Facebook");
                        this.navCtrl.setRoot(HomePage);
                    }
                }
            });

            browserRef.addEventListener("exit", function(event) {
//                reject("The Facebook sign in flow was canceled");
                this.navCtrl.setRoot(HomePage);
            });
        });
    }

}
