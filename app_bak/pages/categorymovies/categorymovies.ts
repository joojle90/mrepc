import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CinemarData } from '../../providers/cinemar-data/cinemar-data';
import { MoviedetailsPage } from '../../pages/moviedetails/moviedetails';
import { BookticketPage } from '../../pages/bookticket/bookticket';

let monthname = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug",
                 "sep", "oct", "nov", "dec"];

@Component({
    templateUrl: 'build/pages/categorymovies/categorymovies.html',
})
export class CategorymoviesPage {
    getmoviecategories: string;
    moviesbycategories: string[];

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        public cinemardata: CinemarData
    ) {
        this.getmoviecategories = this.navParams.data.genrename;
        this.loadcategoryMovieslist(this.getmoviecategories);
//        console.log(this.getmoviecategories);
    }

    loadcategoryMovieslist(thegenre: string) {
        return this.cinemardata.getMovielist().then(data => {
            let mymovies: any = [];

            for (let i in data) {
                let showdate = data[i].showtime.split(" ");
                let theshowdate = new Date (showdate[2], monthname.indexOf(showdate[1].toLowerCase()), showdate[0]);

                for (let j in data[i].moviedetails) {
                    mymovies.push({
                        movieitems: data[i],
                        moviedetails: data[i].moviedetails,
                        showtime: data[i].showtime,
                        genrename: data[i].moviedetails[j].genre,
                        moviestatus: data[i].status,
                        discount: data[i].discount > 0 ?  data[i].discount : 0,
                        comingshow: theshowdate > new Date() ?  1 : 0
                    });
                }
            }

            let movielist = mymovies.sort((a,b) => {
                let datesortA = a.showtime.split(" ");
                let datesortB = b.showtime.split(" ");
                let newdateA = new Date (datesortA[2], monthname.indexOf(datesortA[1].toLowerCase()), datesortA[0]);
                let newdateB = new Date (datesortB[2], monthname.indexOf(datesortB[1].toLowerCase()), datesortB[0]);
                return newdateB > newdateA ? 1 : -1;
            });

            this.moviesbycategories = movielist.filter((datamovies, j) => {
                for (let i in datamovies.genrename) {
                    if(datamovies.genrename[i].genrename === thegenre && movielist[j].moviestatus === "active") {
                        this.moviesbycategories = movielist[j]
                        return this.moviesbycategories;
                    }
                }
            });
//            console.log(this.moviesbycategories);
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
        console.log(movieitems);
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
            comingshow: theshow > new Date() ?  1 : 0
        });
    }

}
