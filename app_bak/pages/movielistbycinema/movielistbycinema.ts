import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CinemarData } from '../../providers/cinemar-data/cinemar-data';
import { MoviedetailsPage } from '../../pages/moviedetails/moviedetails';
import { BookticketPage } from '../../pages/bookticket/bookticket';

let monthname = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug",
                 "sep", "oct", "nov", "dec"];

@Component({
    templateUrl: 'build/pages/movielistbycinema/movielistbycinema.html',
})

export class MovielistbycinemaPage {
    getcinemadetails: string[];
    getcinemaimages: string[];
    listmovies: string[];
    slideconf: any;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        public cinemardata: CinemarData
    ) {
        this.slideconf = {
            initialSlide: 0,
            autoplay: 3000,
            autoplayDisableOnInteraction: false
        };

        this.getcinemaimages = this.navParams.data['cinemaimages'];

        let images: any = [];
        for(var i in this.getcinemaimages) {
            images.push({
                image: this.getcinemaimages[i]
            })
        }
        this.getcinemaimages = images;

        this.getcinemadetails = this.navParams.data;
        this.loadmoviesbycinema(this.navParams.data['cinemaid']);
    }

    loadmoviesbycinema(thecinema: string) {
        return this.cinemardata.getMovielist().then(data => {
            console.log(thecinema);
            let mymovies: any = [];

            for(let i in data) {
                let showdate = data[i].showtime.split(" ");
                let theshowdate = new Date (showdate[2], monthname.indexOf(showdate[1].toLowerCase()), showdate[0]);

                for(let j in data[i].cinemamovie) {
                    if(data[i].cinemamovie[j].cinemaid === thecinema) {
                        mymovies.push({
                            movieid: data[i].movieid,
                            moviename: data[i].moviename,
                            image_small: data[i].image_small,
                            image_land: data[i].image_land,
                            moviedetails: data[i].moviedetails,
                            duration: data[i].duration,
                            showtime: data[i].showtime,
                            status: data[i].status,
                            like: data[i].like,
                            discount: data[i].discount > 0 ?  data[i].discount : 0,
                            comingshow: theshowdate > new Date() ?  1 : 0,
                            cinemastatus: true
                        });
                    }
                }
            }

            let movielist = mymovies.sort((a,b) => {
                let datesortA = a.showtime.split(" ");
                let datesortB = b.showtime.split(" ");
                let newdateA = new Date (datesortA[2], monthname.indexOf(datesortA[1].toLowerCase()), datesortA[0]);
                let newdateB = new Date (datesortB[2], monthname.indexOf(datesortB[1].toLowerCase()), datesortB[0]);
                return newdateB > newdateA ? 1 : -1;
            });

            this.listmovies = movielist;
            console.log(movielist);
        })
    }

    bookticket(getmovieitems) {
//        console.log(getmovieitems);
        this.navCtrl.push(BookticketPage, {
            movieid: getmovieitems.movieid,
            movieimage: getmovieitems.image_land,
            movienames: getmovieitems.moviename,
            moviediscount: getmovieitems.discount,
            cinemastatus: getmovieitems.cinemastatus,
            cinemaid: this.navParams.data['cinemaid']
        });
    }

    watchtrailer(movieitems, moviedetails) {
//        console.log(movieitems);
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
            comingshow: theshow > new Date() ?  1 : 0,
            cinemastatus: movieitems.cinemastatus,
            cinemaid: this.navParams.data['cinemaid']
        });
    }

}
