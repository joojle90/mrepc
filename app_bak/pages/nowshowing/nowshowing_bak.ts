import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { SocialSharing } from 'ionic-native';
import { CinemarData } from '../../providers/cinemar-data/cinemar-data';
import { MoviedetailsPage } from '../../pages/moviedetails/moviedetails';
import { BookticketPage } from '../../pages/bookticket/bookticket';

let monthname = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug",
                 "sep", "oct", "nov", "dec"];

declare var cordova;

@Component({
    templateUrl: 'build/pages/nowshowing/nowshowing.html',
})
export class NowshowingPage {
    movielist: string[];
    app: any;

    constructor(
        private navCtrl: NavController,
        private loadingCtrl: LoadingController,
        public cinemardata: CinemarData
    ) {
        this.presentLoadingData();
    }

//    ngOnInit() {
//        let loader = this.loadingCtrl.create({
//            content: "Please wait..." ,
//            duration: 3000,
//            dismissOnPageChange: true
//        });
//        try {
//            loader.present();
//        } catch (e) {
//
//        }
////            loader.present();
//        this.loadmovielist().then(() => {
//            setTimeout(() => {
//                loader.dismiss();
//             }, 3000);
//        });
//    }

    loadmovielist() {
        return this.cinemardata.getMovielist().then(data => {
            let movieitems = data.filter(themovie => {
                let datea = themovie.showtime.split(" ");
                let thedate = new Date (datea[2], monthname.indexOf(datea[1].toLowerCase()), datea[0]);
                return thedate < new Date() && themovie.status === "active";
            });
            this.movielist = movieitems.sort((a,b) => {
                let datesortA = a.showtime.split(" ");
                let datesortB = b.showtime.split(" ");
                let newdateA = new Date (datesortA[2], monthname.indexOf(datesortA[1].toLowerCase()), datesortA[0]);
                let newdateB = new Date (datesortB[2], monthname.indexOf(datesortB[1].toLowerCase()), datesortB[0]);
                return newdateB > newdateA;
            });
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
            comingshow: theshow > new Date() ?  1 : 0
        });
    }

    presentLoadingData() {
//        setTimeout(() => {
            let loader = this.loadingCtrl.create({
                content: "Please wait..."
            });
            //loader.present();
            try {
                loader.present();
            } catch (e) {
                console.log(e);
            }

            this.loadmovielist().then(() => {
                loader.dismiss();
            });
//        }, 3000);
    }

    getARapps() {
        console.log("buttoon clicked");
        alert("test1");
        var app = {
            arExperienceUrl: "www/world/2_CloudRecognition_2_ContinuousRecognitionVsOn-Click/index.html",
            requiredFeatures: ["2d_tracking"],
            isDeviceSupported: false,
            startupConfiguration: {
                "camera_position": "back"
            },

            initialize: function () {
                this.bindEvents();
            },

            bindEvents: function () {
                document.addEventListener('deviceready', this.onDeviceReady, false);
            },

            onDeviceReady: function () {
                this.app.wikitudePlugin = this.cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
                this.app.wikitudePlugin.isDeviceSupported(this.app.onDeviceSupported, this.app.onDeviceNotSupported, this.app.requiredFeatures);
            },

            onDeviceSupported: function () {
                this.app.wikitudePlugin.setOnUrlInvokeCallback(this.app.onURLInvoked);

                this.app.wikitudePlugin.loadARchitectWorld(
                    this.app.onARExperienceLoadedSuccessful,
                    this.app.onARExperienceLoadError,
                    this.app.arExperienceUrl,
                    this.app.requiredFeatures,
                    this.app.startupConfiguration
                );
            },

            onDeviceNotSupported: function (errorMessage) {
                alert(errorMessage);
            },

            onARExperienceLoadedSuccessful: function (loadedURL) {

            },

            onARExperienceLoadError: function (errorMessage) {
                alert('Loading AR web view failed: ' + errorMessage);
            }

//            onURLInvoked: function(url) {
//                var splittedURL = url.split('?');
//                var action = splittedURL[0];
//                var message =  String(splittedURL[1]);
//                var image =  String(splittedURL[2]);
//                var link = String( splittedURL[3]);
//
//                //cordova plugin add https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git
//                if ( action.indexOf('shareInFacebook') > -1) {
//                    SocialSharing
//                    //Share via native share sheet
//                    .shareViaFacebook(message,  image, link)
//                    .then(function(result) {
//                        //Success!
//                    }, function(err) {
//                        //An error occured. Show a message to the user
//                        alert("Download and log in to your Facebook App");
//                    });
//                } else if ( action.indexOf('shareInTwitter') > -1) {
//                    SocialSharing
//                    //Share via native share sheet
//                    .shareViaTwitter(message,  image, link)
//                    .then(function(result) {
//                        //Success!
//                    }, function(err) {
//                        //An error occured. Show a message to the user
//                        alert("Download and log in to your Twitter  App" );
//                    });
//                }
                //else if ( action.indexOf('goToBuyTicket') > -1)
                //else if ( action.indexOf('goToTopHits') > -1)
                //else if ( action.indexOf('goToMovieInformation') > -1)
//            }

        }
        alert("test2");
        app.initialize();
        console.log(app.initialize());

        var app = {

        // Url/Path to the augmented reality experience you would like to load
       // arExperienceUrl: "www/experience/index.html",

        arExperienceUrl: "www/world/1_ClientRecognition_1_ImageOnTarget/index.html",

        //cloud recognition continuous scan
        //arExperienceUrl: "www/world/2_CloudRecognition_2_ContinuousRecognitionVsOn-Click/index.html",
        // The features your augmented reality experience requires, only define the ones you really need
        requiredFeatures: ["2d_tracking"],
        // Represents the device capability of launching augmented reality experiences with specific features
        isDeviceSupported: false,
        // Additional startup settings, for now the only setting available is camera_position (back|front)
        startupConfiguration: {
          "camera_position": "back"
        },
        // Application Constructor
        initialize: function () {
          this.bindEvents();
        },
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bindEvents: function () {
          document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        // deviceready Event Handler
        onDeviceReady: function () {
          (<any>app).wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
          (<any>app).wikitudePlugin.isDeviceSupported((<any>app).onDeviceSupported, (<any>app).onDeviceNotSupported, (<any>app).requiredFeatures);
        },
        // Callback if the device supports all required features
        onDeviceSupported: function () {
          (<any>app).wikitudePlugin.loadARchitectWorld(
            app.onARExperienceLoadedSuccessful,
            app.onARExperienceLoadError,
            app.arExperienceUrl,
            app.requiredFeatures,
            app.startupConfiguration
          );
        },
        // Callback if the device does not support all required features
        onDeviceNotSupported: function (errorMessage) {
          alert(errorMessage);
        },
        // Callback if your AR experience loaded successful
        onARExperienceLoadedSuccessful: function (loadedURL) {
          /* Respond to successful augmented reality experience loading if you need to */
        },
        // Callback if your AR experience did not load successful
        onARExperienceLoadError: function (errorMessage) {
          alert('Loading AR web view failed: ' + errorMessage);
        }

      };


      app.initialize();
    }
}
