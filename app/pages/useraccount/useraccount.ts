import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Userdata } from '../../providers/userdata/userdata';

/*
  Generated class for the UseraccountPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'build/pages/useraccount/useraccount.html',
})
export class UseraccountPage {
    login: {username?: string, password?: string} = {};
    submitted = false;

    constructor(
        private navCtrl: NavController,
        private alertCtrl: AlertController,
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
