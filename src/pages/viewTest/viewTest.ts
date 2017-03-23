import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Auth} from '../../providers/auth';
import {LoginPage} from '../login/login';
import { HomePage } from '../home/home';
import { Upcoming } from '../upcomingTest/upcoming';


@Component({
  selector: 'page-viewTest',
  templateUrl: 'viewTest.html'
})

export class viewTest {

    param: any;
  
  constructor(private navCtrl: NavController, private auth: Auth, public navParams: NavParams) {
   this.param = this.navParams.get('result');
  }

  //param: any = this.navParams.get('testResult');


//   ionViewWillEnter(){
//     this.param = this.navParams.get('result');
//   }

}