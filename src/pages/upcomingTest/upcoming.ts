import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import {Auth} from '../../providers/auth';
import {LoginPage} from '../login/login';
import {Http} from '@angular/http';
import { viewTest } from '../viewTest/viewTest';

@Component({
  selector: 'page-upcoming',
  templateUrl: 'upcoming.html'
})

export class Upcoming {
  
  items = [];
  testResult: any;
  start: number;
  count: number;
  values: any;

  link = this.auth.mainUrl + 'tests/getbynext/';
  

  constructor(private navCtrl: NavController, private auth: Auth, private http: Http, private alertCtrl: AlertController, 
              private loadingCtrl: LoadingController) {

    this.start = 0;                                               //Position and ammount of tests which are being
    this.count = 15;                                              //requested from the database

    this.values = JSON.stringify({start: this.start, count: this.count});

    this.http.post(this.link, this.values).map(res => res.json()).subscribe(
      (data) => {

        for (let i = 0; i < Math.min(this.count, data.length); i++) {           //if there are less tests than requested,
          this.items.push(data[i]);                                             //display only da available ones
        }

      },
      err => {
        this.showError(err);
      })
  }

    doInfinite(infiniteScroll) {                                              //request tests on reaching the bottom
                                                                              //of the page
      this.start = this.start + this.count;
      this.values = JSON.stringify({start: this.start, count: this.count});

      setTimeout(() => {

        this.http.post(this.link, this.values).map(res => res.json()).subscribe(
          (data) => {

          if(data.length == 0){
            infiniteScroll.enable(false);                               //if there are no more tests,
          }                                                             //disable the infinite scroll

          for (let i = 0; i < Math.min(this.count, data.length); i++) {
              this.items.push(data[i]);
          }

          this.start = this.start - this.count + Math.min(this.count, data.length)      //Adjust the position at which
                                                                                        //tests are being requested from the database
          },
          err => {
            this.start = this.start - this.count;
            this.showError(err);
            // this.showError(JSON.stringify(err));
          })

        infiniteScroll.complete();
      }, 500);
    }


    sendToViewTest(id){                                                     //Send user to viewTest page along with the test id

    setTimeout(() => {

      let address = this.auth.mainUrl + 'tests/get/';
      let payload = JSON.stringify({id: id})    

      this.http.post(address, payload).map(res => res.json()).subscribe(
        (data) => {

          this.testResult = data;
          this.navCtrl.push(viewTest, {result: this.testResult});
            
        },
        err => {
            // let error = JSON.stringify(err);
            this.showError(err);
        })

     })
  }

  showError(text) {
    let alert = this.alertCtrl.create({
      title: 'Status',
      subTitle: text._body,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
