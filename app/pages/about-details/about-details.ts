import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform, NavController, NavParams, LoadingController, AlertController, ModalController, ViewController } from 'ionic-angular';
import { EmailComposer, GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';

@Component({
    templateUrl: 'build/pages/about-details/about-details.html'
})
export class AboutDetailsPage {
    urllink: string;
    addressdet: any;

    constructor(
        private navCtrl: NavController,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        public modalCtrl: ModalController,
        private navParams: NavParams
    ) {
        this.urllink = this.navParams.get('urllink');
        this.addressdet = this.navParams.data;
        console.log(this.addressdet);
    }

    mapshow() {
        let modal = this.modalCtrl.create(AboutMapPage);
        modal.present();
//        let alert = this.alertCtrl.create({
//          title: 'Coming Soon',
//          subTitle: 'We will update our Map',
//          buttons: ['OK']
//        });
//        alert.present();
    }

    contactus() {
        let modal = this.modalCtrl.create(AboutcontactPage);
        modal.present();
    }
}

@Component({
    templateUrl: 'build/pages/about-details/about-contact.html',
})
export class AboutcontactPage {
    contactSupplier: any;
    itemdetails: any;
    contact: {name?: string, company?: string, country?: string, email?: string, message?: string} = {};
    submitted = false;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private alertCtrl: AlertController,
        public viewCtrl: ViewController
    ) {
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    submitenquiry(form) {
        let email = {
            to: 'jol_fakar@yahoo.co.id',
            subject: 'Cordova Icons',
            body: 'How are you? Nice greetings from Leipzig',
            isHtml: true
        };

        this.submitted = true;

        if (form.valid) {
            EmailComposer.open(email);
            let alert = this.alertCtrl.create({
              title: 'Successful message',
              subTitle: 'Thank you for submit your inquiry',
              buttons: ['OK']
            });
            alert.present();
        }
    }

}

@Component({
    templateUrl: 'build/pages/about-details/about-map.html',
})
export class AboutMapPage {
    map: GoogleMap;

    constructor(
        private platform: Platform,
        private navCtrl: NavController,
        private navParams: NavParams,
        private alertCtrl: AlertController,
        public viewCtrl: ViewController
    ) {
        this.platform.ready().then(() => {
            this.loadMap();
        });
    }

//    setupGoogleMap(){
//        // somewhere in your component
//        this.map = new GoogleMap('map');
//
//        let marker = new GoogleMapsMarker(this.map);
//        marker.setTitle("Teste");
//        let latLng = new GoogleMapsLatLng(-53.6339946,-76.6077185);
//        marker.setPosition(latLng);
//
//        this.map.setCenter(latLng);
//        this.map.setZoom(12);
//
//        this.map.on(GoogleMapsEvent.MAP_READY)
//            .subscribe(() =>                                                         console.log("Map is ready!")
//            );
//    }

    loadMap(){
        let location = new GoogleMapsLatLng(-34.9290,138.6010);

        this.map = new GoogleMap('map', {
          'backgroundColor': 'white',
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
            'zoom': true
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'latLng': location,
            'tilt': 30,
            'zoom': 15,
            'bearing': 50
          }
        });

        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
        });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}
