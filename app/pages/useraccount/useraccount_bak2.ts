import { Component, Type } from '@angular/core';
import { NavParams, NavController, AlertController, Platform, LoadingController, SqlStorage, Storage, Events, ViewController, ModalController } from 'ionic-angular';
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
    userStatus: string;

    private storage: Storage;

    private rootPage: Type = HomePage;

    constructor(
        private navCtrl: NavController,
        private alertCtrl: AlertController,
        private platform: Platform,
        private navParams: NavParams,
        private loadingCtrl: LoadingController,
        public userData: Userdata,
        private events: Events,
        public modalCtrl: ModalController,
        public http:Http
    ) {

        this.storage = new Storage(SqlStorage);
        this.userList = [];
        this.userStatus = this.navParams.get('status');

        if(this.userStatus === "false") {
            this.fbLogin();
        } else {
            this.fbLogout();
        }
    }

    fbLogin() {
        this.platform.ready().then(() => {
            this.facebookLogin().then(success => {
//                alert(success.access_token);
                this.http.get('http://110.74.131.116:8181/mrepc-api/registrationDevices?idreg='+success.access_token).map(res => res.json()).subscribe(data => {
//                        alert("Thank you for join with us");
//                        alert("token="+success.access_token);
                });

                this.http.get('https://graph.facebook.com/me?fields=id,email,name,first_name,last_name,gender&access_token='+success.access_token).map(res => res.json()).subscribe(datafb => {
                    alert(datafb.id+" "+datafb.name+" "+datafb.email+" "+datafb.first_name+" "+datafb.last_name+" "+datafb.gender+" "+datafb.hometown+" "+datafb.birthday);

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

    fbLogout() {
//        let modal = this.modalCtrl.create(UseraccountProfilePage);
//        modal.present();
    }

//    userlogin() {
//        let alert = this.alertCtrl.create({
//          title: 'Login',
//          subTitle: 'You are login now!',
//          buttons: ['OK']
//        });
//        alert.present();
//    }

    userSignup(form) {
        let alert = this.alertCtrl.create({
          title: 'Successful Sign Up',
          subTitle: 'Thank you for sign up to our application',
          buttons: ['OK']
        });
        alert.present();
    }

}

@Component({
    templateUrl: 'build/pages/useraccount/useraccount-profile.html',
})
export class UseraccountProfilePage {
    profile: {username?: string, email?: string, gender?: string} = {};
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

//    register(form) {
//        this.submitted = true;
//
//        if (form.valid) {
//            let alert = this.alertCtrl.create({
//              title: 'Successful registration',
//              subTitle: 'Your request will be process',
//              buttons: ['OK']
//            });
//            alert.present();
//        }
//    }

}
