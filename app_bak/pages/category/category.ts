import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CinemarData } from '../../providers/cinemar-data/cinemar-data';
import { CategorymoviesPage } from '../../pages/categorymovies/categorymovies';

@Component({
    templateUrl: 'build/pages/category/category.html',
})
export class CategoryPage {
    categorylist: string[];

    constructor(
        private navCtrl: NavController,
        public cinemardata: CinemarData
    ) {
        this.loadcategorylist();
    }

    loadcategorylist() {
        return this.cinemardata.getCategorylist().then(data => {
            this.categorylist = data.sort((a, b) => {
                return a.genrename.localeCompare(b.genrename)
            })
        })
    }

    moviebygenre(genrename) {
        this.navCtrl.push(CategorymoviesPage, {
            genrename: genrename
        });
    }

}
