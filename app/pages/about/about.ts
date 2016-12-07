import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AboutDetailsPage } from '../../pages/about-details/about-details';


@Component({
    templateUrl: 'build/pages/about/about.html',
})
export class AboutPage {
    aboutaddress: any;
    urllink: string;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams
    ) {
        this.urllink = this.navParams.get('urllink');
        this.aboutaddress = [{
            country: 'Malaysia',
            address: 'Unit No 36-02, Level 36, Q Sentral '+
                     '2A Jalan Stesen Sentral 2, KL Sentral '+
                     '50470 Kuala Lumpur Malaysia.',
            contactno: '(603) 2780 5888',
            fax: '(603) 2780 5088',
            email: 'info@mrepc.com',
            contactperson: '-',
            status: 'Headquater',
            image: 'mrepc-hq.jpg'
        },{
            country: 'USA',
            address: '3516 International Court, NW '+
                     'Washington, DC 20008 '+
                     'USA',
            contactno: '+1 (202) 572 9771',
            fax: '+1 (202) 572 9787',
            email: 'esahsyip@mrepc.com',
            contactperson: 'Dr Esah Yip',
            status: 'Branch',
            image: 'mrepc-usa.jpg'
        },{
            country: 'Europe',
            address: '-',
            contactno: '-',
            fax: '-',
            email: 'europe@mrepc.com',
            contactperson: 'Mr. Muhammad Fazli Abdul Jalil',
            status: 'Branch',
            image: 'mrepc-europe.jpg'
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
            status: 'Branch',
            image: 'mrepc-china.jpg'
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
            status: 'Branch',
            image: 'mrepc-guangzhou.jpg'
        },{
            country: 'India',
            address: '907, Tulsiani Chambers, '+
                     'Nariman Point, '+
                     'Mumbai-400 021, '+
                     'Maharashtra, India.',
            contactno: '+91 22 6221 6725',
            fax: '+91 22 6223 2359',
            email: 'mumbai@mrepc.com',
            contactperson: 'Mr. Samir Shah',
            status: 'Branch',
            image: 'mrepc-india.jpg'
        }];
    }

    officeaddress(address) {
        this.navCtrl.push(AboutDetailsPage, {
            officeaddr: address,
            urllink: this.urllink
        });
    }

}
