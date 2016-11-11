import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CinemarData } from '../../providers/cinemar-data/cinemar-data';
import { BookticketPage } from '../../pages/bookticket/bookticket';
import { BROWSER_SANITIZATION_PROVIDERS, SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';

@Component({
    templateUrl: 'build/pages/moviedetails/moviedetails.html',
    providers: [BROWSER_SANITIZATION_PROVIDERS]
})
export class MoviedetailsPage {
    getmoviedetails: string[];
    youtubelink: SafeResourceUrl;
    trustlink: string;

    constructor(
        private navCtrl: NavController,
        private sanitizer: DomSanitizationService,
        private navParams: NavParams
    ) {
        this.getmoviedetails = this.navParams.data;
        this.trustlink = "https://www.youtube.com/embed/"+this.navParams.data.moviedetails.trailer;
        this.youtubelink = this.sanitizer.bypassSecurityTrustResourceUrl(this.trustlink);
        console.log(this.navParams.data);
    }

    bookticket(getmovieitems) {
        console.log(getmovieitems);
        this.navCtrl.push(BookticketPage, {
            movieid: getmovieitems.movieid,
            movieimage: getmovieitems.image,
            movienames: getmovieitems.movienames,
            moviediscount: getmovieitems.discount,
            cinemastatus: getmovieitems.cinemastatus,
            cinemaid: this.navParams.data['cinemaid']
        });
    }

}
