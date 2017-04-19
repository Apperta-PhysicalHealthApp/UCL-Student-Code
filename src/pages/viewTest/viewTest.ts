import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Auth} from '../../providers/auth';
import {LoginPage} from '../login/login';
import { HomePage } from '../home/home';
import { Upcoming } from '../upcomingTest/upcoming';
import { LocalNotifications } from 'ionic-native';
import { DatePicker } from '@ionic-native/date-picker';
import {Calendar} from '@ionic-native/calendar';


@Component({
  selector: 'page-viewTest',
  templateUrl: 'viewTest.html'
})

export class viewTest {

    param: any;
    isNew: boolean;
  
  constructor(private navCtrl: NavController, private auth: Auth, public navParams: NavParams, 
              public alertCtrl: AlertController, private datePicker: DatePicker, private calendar: Calendar) {
    this.param = this.navParams.get('result');
  }

  public schedule() {
    LocalNotifications.schedule({
      id: new Date(this.param.date).getTime(),
      title: "Health Test - MetabolicApp " + this.param.name,
      text: "You have a health test upcoming in a day, please check the metabolicApp for more information.",
      at: new Date(this.param.date.getTime() - 1000 * 60 * 60 * 24),
    });
  }

  public makeBooking(){

  }

  public addToCalendar(){

    this.datePicker.show({
      date: new Date(this.param.date),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT
    }).then(
      date => {
          this.calendar.createEventInteractively(this.param.name, undefined, undefined, date, undefined);
          
          LocalNotifications.schedule({
            id: new Date(this.param.date).getTime(),
            title: "Health Test - MetabolicApp " + this.param.name,
            text: "You have a health test upcoming in a day, please check the metabolicApp for more information.",
            at: new Date(date.getTime() - 1000 * 60 * 60 * 24),
          });
      },  
      err => {
          let alert = this.alertCtrl.create({
            title: 'Status',
            subTitle: err,
            buttons: ['OK']
          });
          alert.present(prompt);
      });

  }


  //param: any = this.navParams.get('testResult');
  

  ionViewWillEnter(){
      let current_date = new Date();
      let test_date = new Date(this.param.date);
      
      let one_day_before_test = new Date(test_date.getTime() - 100 * 60 * 60 * 24);

      if(current_date < one_day_before_test) {
        this.isNew = true;
      } else {
        this.isNew = false;
      }
  }

}