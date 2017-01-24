import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { AboutDetailsPage } from '../../pages/about-details/about-details';


@Component({
    templateUrl: 'build/pages/about/about.html',
})
export class AboutPage {
    aboutaddress: any;
    urllink: string;

    constructor(
        private navCtrl: NavController,
        private loadingCtrl: LoadingController,
        private navParams: NavParams
    ) {
        this.urllink = this.navParams.get('urllink');
        this.aboutaddress = [{
            country: 'Kuala Lumpur',
            address: 'Unit No 36-02, Level 36, Q Sentral '+
                     '2A Jalan Stesen Sentral 2, KL Sentral '+
                     '50470 Kuala Lumpur Malaysia.',
            contactno: '(603) 2780 5888',
            fax: '(603) 2780 5088',
            email: 'mpd@mrepc.com',
            contactperson: '-',
            status: 'Malaysia',
            image: 'mrepc-hq.jpg',
            lat: 3.1390008,
            lng: 101.6168144
        },{
            country: 'Guangzhou',
            address: 'Room 505, Block A, '+
                     'China Shine Plaza, '+
                     'No.9 Linhe Xi Road, Tianhe, '+
                     'Guangzhou, 510610 P.R. China.',
            contactno: '+86 20 2205 7707',
            fax: '+86 20 2205 7706',
            email: 'guangzhou@mrepc.com',
            contactperson: 'Mr. Chang Kah Chun',
            status: 'China',
            image: 'mrepc-guangzhou.jpg',
            lat: 23.142806,
            lng: 113.3214053
        },{
            country: 'Shanghai',
            address: 'Room 1808, No. 689, '+
                     'Haitong Securities Tower, '+
                     'Guangdong Road, 200001 Shanghai, '+
                     'P.R. China.',
            contactno: '+86 21 3376 7001',
            fax: '+86 21 3376 7002',
            email: 'shanghai@mrepc.com',
            contactperson: 'Ms. Lio Lan Sing',
            status: 'China',
            image: 'mrepc-china.jpg',
            lat: 31.2120755,
            lng: 121.4272926
        },{
            country: 'Mumbai',
            address: '907, Tulsiani Chambers, '+
                     'Nariman Point, '+
                     'Mumbai-400 021, '+
                     'Maharashtra, India.',
            contactno: '+91 22 6221 6725',
            fax: '+91 22 6223 2359',
            email: 'mumbai@mrepc.com',
            contactperson: 'Mr. Samir Shah',
            status: 'India',
            image: 'mrepc-india.jpg',
            lat: 18.9238204,
            lng: 72.821505
        },{
            country: 'Washington DC',
            address: '3516 International Court, NW '+
                     'Washington, DC 20008 '+
                     'USA',
            contactno: '+1 (202) 572 9771',
            fax: '+1 (202) 572 9787',
            email: 'esahsyip@mrepc.com',
            contactperson: 'Dr Esah Yip',
            status: 'United States of America',
            image: 'mrepc-usa.jpg',
            lat: 38.9437494,
            lng: -77.0713408
        }];
    }

    ngAfterViewInit() {
        this.presentLoadingData();
    }

    presentLoadingData() {
        let loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        setTimeout(() => {
            loader.dismiss();
        }, 900);
    }

    officeaddress(address) {
        this.navCtrl.push(AboutDetailsPage, {
            officeaddr: address,
            urllink: this.urllink
        });
    }

}
