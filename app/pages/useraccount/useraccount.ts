import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Userdata } from '../../providers/userdata/userdata';

/*
  Generated class for the UseraccountPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var window: any;
@Component({
    templateUrl: 'build/pages/useraccount/useraccount.html',
})
export class UseraccountPage {
    login: {username?: string, password?: string} = {};
    submitted = false;

    constructor(
        private navCtrl: NavController,
        private alertCtrl: AlertController,
        private platform: Platform,
        public userData: Userdata
    ) {

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
                alert(success.access_token);
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
                        parsedResponse[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
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
