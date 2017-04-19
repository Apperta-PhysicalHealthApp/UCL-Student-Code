import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Auth} from '../../providers/auth';
import {LoginPage} from '../login/login';
import { HomePage } from '../home/home';
import { Upcoming } from '../upcomingTest/upcoming';
import { LocalNotifications } from 'ionic-native';


@Component({
  selector: 'page-viewTest',
  templateUrl: 'viewTest.html'
})

export class viewTest {

    param: any;
    isNew: boolean;
    test_date: any;
  
  constructor(private navCtrl: NavController, private auth: Auth, public navParams: NavParams, public alertCtrl: AlertController) {
    this.param = this.navParams.get('result');
  }

  public schedule() {
    LocalNotifications.schedule({
      id: new Date(this.param.date).getTime(),
      title: "Health Test - MetabolicApp " + this.param.name,
      text: "You have a health test upcoming in a day, please check the metabolicApp for more information.",
      at: new Date(this.test_date.getTime() - 1000 * 60 * 60 * 24),
    });
  }


  //param: any = this.navParams.get('testResult');
  

  ionViewWillEnter(){
      let current_date = new Date();
      this.test_date = new Date(this.param.date);
      
      let one_day_before_test = new Date(this.test_date.getTime() - 100 * 60 * 60 * 24);

      if(current_date < one_day_before_test) {
        this.isNew = true;
      } else {
        this.isNew = false;
      }
  }

}