import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CinemarData } from '../../providers/cinemar-data/cinemar-data';
import { MoviedetailsPage } from '../../pages/moviedetails/moviedetails';
import { SelectseatsPage } from '../../pages/selectseats/selectseats';

let monthname = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug",
                 "sep", "oct", "nov", "dec"];

@Component({
    templateUrl: 'build/pages/fastticket/fastticket.html',
})
export class FastticketPage {
    currentmovieslist: string[];
    movielist: string[];
    slideconf: any;
    selectionmoviesDD: string[];
    selectioncinemasDD: string[];
    selectiondatesDD: string[];
    selectiontimeDD: string[];
    selectedmovies: any;
    selectedcinema: any;
    selecteddate: any;
    selectedtime: any;
    selectedticket: any;

    constructor(
        private navCtrl: NavController,
        public cinemardata: CinemarData
    ) {
        this.slideconf = {
            initialSlide: 0,
            autoplay: 3000,
            autoplayDisableOnInteraction: false
        };

        this.selectedmovies = "";
        this.selectedcinema = "";
        this.selecteddate = "";
        this.selectedtime = "";
        this.selectedticket = "";

        this.loadcurrentmovielist();
        this.loadmovieselection();
    }

    loadcurrentmovielist() {
        return this.cinemardata.getMovielist().then(data => {
            let thecurrentmovies = data.filter(themovie => {
                let datea = themovie.showtime.split(" ");
                let dateb = new Date (datea[2], monthname.indexOf(datea[1].toLowerCase()), datea[0]);
                return dateb < new Date() && themovie.status === "active";
            });
            this.currentmovieslist = thecurrentmovies.sort((a,b) => {
                return b.like - a.like;
            });
            this.currentmovieslist = this.currentmovieslist.slice(0, 5);
        })
    }

    loadmovieselection() {
        return this.cinemardata.getSelectionMovieDD().then(data => {
            this.selectionmoviesDD = data.sort((a,b) => {
                return a.moviename.localeCompare(b.moviename);
            });
        });
    }

    movieChange(selectedmovie) {
        this.selectedcinema = "";
        this.selectedmovies = selectedmovie;
        return this.cinemardata.getSelectionCinemaDD(selectedmovie).then(data => {
            console.log(data);
            this.selectioncinemasDD = data.sort((a,b) => {
                return a.cinemaname.localeCompare(b.cinemaname);
            });
        });
    }

    cinemaChange(selectedcinema) {
        this.selecteddate = "";
        return this.cinemardata.getSelectionDateDD(this.selectedmovies, selectedcinema).then(data => {
            this.selectiondatesDD = data;
            console.log(data);
        });
    }

    dateChange(selecteddate) {
        this.selectedtime = "";
        return this.cinemardata.getSelectionTimeDD(selecteddate).then(data => {
            this.selectiontimeDD = data;
            console.log(data);
        });
    }

    timeChange(selectedtime) {
        this.selectedticket = "";
        console.log(selectedtime);
    }

    ticketchange(selectedticket) {
        this.selectedticket = selectedticket;
    }

    selectseats() {
        this.navCtrl.push(SelectseatsPage, {
            totalticket: this.selectedticket
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
