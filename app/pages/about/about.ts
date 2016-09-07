import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {
    @ViewChild('imgtest') imgtest: ElementRef;

    onPageLoaded() {
        console.log(this.imgtest);
    }
  constructor(private navCtrl: NavController) {
  }
}
