import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the TutorialPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/tutorial/tutorial.html',
})
export class TutorialPage {
    slides: any;

    constructor(
        private navCtrl: NavController
    ) {
        this.slides = [
        {
            title: "Welcome to MREPC!",
            description: "I can't wait to explore the app",
            image: "img/misc/slide1.jpg"
        },
        {
            title: "Marketplace",
            description: "Find your items here",
            image: "img/misc/slide2.jpg"
        },
        {
            title: "Tradeshows",
            description: "Let's join our tradeshows",
            image: "img/misc/slide3.jpg"
        },
        {
            title: "Seminar",
            description: "Register our seminar now!!!",
            image: "img/misc/slide4.jpg"
        }
        ];

    }

}
