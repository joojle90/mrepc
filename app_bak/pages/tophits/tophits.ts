import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CinemarData } from '../../providers/cinemar-data/cinemar-data';
import { MoviedetailsPage } from '../../pages/moviedetails/moviedetails';
import { BookticketPage } from '../../pages/bookticket/bookticket';

let monthname = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug",
                 "sep", "oct", "nov", "dec"];

@Component({
    templateUrl: 'build/pages/tophits/tophits.html',
})
export class TophitsPage {
    tophitslist: string[];

    constructor(
        private navCtrl: NavController,
        public cinemardata: CinemarData
    ) {
        this.loadtophitslist();
    }

    loadtophitslist() {
        return this.cinemardata.getMovielist().then(data => {
            let thetophits = data.filter(themovie => {
                let datea = themovie.showtime.split(" ");
                let dateb = new Date (datea[2], monthname.indexOf(datea[1].toLowerCase()), datea[0]);
                return dateb < new Date() && themovie.status === "active";
            });
            this.tophitslist = thetophits.sort((a,b) => {
                return b.like - a.like;
            });
            this.tophitslist = this.tophitslist.slice(0, 10);
        })
    }

    bookticket(getmovieitems) {
        console.log(getmovieitems);
        this.navCtrl.push(BookticketPage, {
            movieid: getmovieitems.movieid,
            movieimage: getmovieitems.image_land,
            movienames: getmovieitems.moviename,
            moviediscount: getmovieitems.discount
        });
    }

    watchtrailer(movieitems, moviedetails) {
        let showa = movieitems.showtime.split(" ");
        let theshow = new Date (showa[2], monthname.indexOf(showa[1].toLowerCase()), showa[0]);

        this.navCtrl.push(MoviedetailsPage, {
            movieid: movieitems.movieid,
            image: movieitems.image_land,
            showtimes: movieitems.showtime,
            movienames: movieitems.moviename,
            likes: movieitems.like,
            moviedetails: moviedetails,
            discount: movieitems.discount,
            comingshow: theshow > new Date() ? 1 : 0
        });
    }

}
