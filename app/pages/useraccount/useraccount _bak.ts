import { Component, Type } from '@angular/core';
import { NavController, AlertController, Platform, LoadingController, SqlStorage, Storage } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';
import { HomePage } from '../home/home';
import { Userdata } from '../../providers/userdata/userdata';
 
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
     
    private storage: Storage;
    private rootPage: Type = HomePage;

    constructor(
        private navCtrl: NavController,
        private alertCtrl: AlertController,
        private platform: Platform,
        private loadingCtrl: LoadingController,
        public userData: Userdata,
        public http:Http
    ) {
        this.storage = new Storage(SqlStorage);
        this.userList = [];
        this.fbLogin();
    }

    userLogin(form) {
        this.submitted = true;

        if (form.valid) {
            this.userData.login(this.login.username);
            this.navCtrl.push(HomePage);
        }
    }

    fbLogin() {
        this.platform.ready().then(() => {
            this.facebookLogin().then(success => {
//                alert(success.access_token);
                this.http.get('http://110.74.131.116:8181/mrepc-api/registrationDevices?idreg='+success.access_token).map(res => res.json()).subscribe(data => {
                        //alert(data.status);
                //console.log(data.status);
                });

		//alert(JSON.stringify(success));
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
			alert(responseParameters[i]);
                        
                    
//                    this.storage.query("INSERT INTO user (username, password, image, email) VALUES (?, ?, ?, ?)", ["test", "test", "image", "email"]).then((data) => {
//                        this.userList.push({
//                            "username": "test",
//                            "password": "test",
//                            "image": "imageurl.jpg",
//                            "email": "email@test.com"
//                        });
//                        console.log("INSERTED: " + JSON.stringify(data));
//                    }, (error) => {
//                        console.log(error);
//                    });
                        
                        parsedResponse[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                        this.navCtrl.push(HomePage);
                    }

                    if (parsedResponse["access_token"] !== undefined && parsedResponse["access_token"] !== null) {
                        resolve(parsedResponse);
                    } else {
                        reject("Problem authenticating with Facebook");
                    }
                }
            });

            browserRef.addEventListener("exit", function(event) {
                reject("The Facebook sign in flow was canceled");
                this.navCtrl.push(HomePage);
            });
        });
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
