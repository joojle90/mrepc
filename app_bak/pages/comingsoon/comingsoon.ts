import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CinemarData } from '../../providers/cinemar-data/cinemar-data';
import { MoviedetailsPage } from '../../pages/moviedetails/moviedetails';

let monthname = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug",
                 "sep", "oct", "nov", "dec"];

@Component({
    templateUrl: 'build/pages/comingsoon/comingsoon.html',
})
export class ComingsoonPage {
    comingsoonlist: string[];
    slideconf: any;

    constructor(
        private navCtrl: NavController,
        public cinemardata: CinemarData
    ) {
        this.slideconf = {
            initialSlide: 0,
            autoplay: 3000,
            autoplayDisableOnInteraction: false
        };
        this.loadcomingsoonlist();
    }

    loadcomingsoonlist() {
        return this.cinemardata.getMovielist().then(data => {
            let thecoming = data.filter(datacoming => {
                let datea = datacoming.showtime.split(" ");
                let thedate = new Date (datea[2], monthname.indexOf(datea[1].toLowerCase()), datea[0]);
                return thedate > new Date() && datacoming.status === "active";
            });
            this.comingsoonlist = thecoming.sort((a,b) => {
                let datesortA = a.showtime.split(" ");
                let datesortB = b.showtime.split(" ");
                let newdateA = new Date (datesortA[2], monthname.indexOf(datesortA[1].toLowerCase()), datesortA[0]);
                let newdateB = new Date (datesortB[2], monthname.indexOf(datesortB[1].toLowerCase()), datesortB[0]);
                return newdateB > newdateA;
            });
        })
    }

    watchtrailer(movieitems, moviedetails) {
        let showa = movieitems.showtime.split(" ");
        let theshow = new Date (showa[2], monthname.indexOf(showa[1].toLowerCase()), showa[0]);

        this.navCtrl.push(MoviedetailsPage, {
            showtimes: movieitems.showtime,
            movienames: movieitems.moviename,
            likes: movieitems.like,
            moviedetails: moviedetails,
            discount: movieitems.discount,
            comingshow: theshow > new Date() ?  1 : 0
        });
    }

}
