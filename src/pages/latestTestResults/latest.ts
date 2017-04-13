import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import {Auth} from '../../providers/auth';
import {LoginPage} from '../login/login';
import {Http} from '@angular/http';
import { viewTest } from '../viewTest/viewTest';

@Component({
  selector: 'page-latest',
  templateUrl: 'latest.html'
})

export class Latest {
  
  items = [];
  testResult: any;
  start: number;
  count: number;
  values: any;
  loading: any;

  link = this.auth.mainUrl + 'tests/getbycreated/';
  

  constructor(private navCtrl: NavController, private auth: Auth, private http: Http, private alertCtrl: AlertController, 
              private loadingCtrl: LoadingController) {

    if(this.auth.online){

    this.start = 0;                                                     //Position and ammount of tests which are being
    this.count = 15;                                                    //requested from the database

    this.values = JSON.stringify({start: this.start, count: this.count});

    this.http.post(this.link, this.values).map(res => res.json()).subscribe(
      (data) => {

        for (let i = 0; i < Math.min(this.count, data.length); i++) {     //if there are less tests than requested,
          this.items.push(data[i]);                                       //display only da available ones
        }

        this.auth.add(data.slice(0,2), "latest")

      },
      err => {
        this.showError(err);
      })

    }else{
        this.auth.retrieve("latest").then(doc => {
          this.items = doc;
        })
    }
  }


    doInfinite(infiniteScroll) {                                                  //request tests on reaching the bottom
                                                                                  //of the page
      if(this.auth.online){
     
        this.start = this.start + this.count;
        this.values = JSON.stringify({start: this.start, count: this.count});

        setTimeout(() => {

          this.http.post(this.link, this.values).map(res => res.json()).subscribe(
            (data) => {

            if(data.length == 0){                                                   //if there are no more tests,
              infiniteScroll.enable(false);                                         //disable the infinite scroll
            }

            for (let i = 0; i < Math.min(this.count, data.length); i++) {
                this.items.push(data[i]);
            }

            this.start = this.start - this.count + Math.min(this.count, data.length)        //Adjust the position at which
                                                                                            //tests are being requested from the database
            },
            err => {
              this.start = this.start - this.count;
              this.showError(err);
            })

          infiniteScroll.complete();
        }, 500);
      }
    }


    sendToViewTest(id){
    
    if(id == -1){
      return;
    }

    if(this.auth.online){

    this.showLoading();

    setTimeout(() => {

      let link = this.auth.mainUrl + 'tests/get/';
      let values = JSON.stringify({id: id})    

      this.http.post(link, values).map(res => res.json()).subscribe(
        (data) => {

          this.testResult = data;
          this.loading.dismiss();
          this.navCtrl.push(viewTest, {result: this.testResult});
            
        },
        err => {
            this.loading.dismiss();
            this.showError(err);
        })

     })
    }else{
      this.auth.getId(id).then(result => {
        if(result != undefined){
          this.navCtrl.push(viewTest, {result: result});
        }else{
          let alert = this.alertCtrl.create({
            title: 'Status',
            subTitle: "No data for test",
            buttons: ['OK']
          });
          alert.present(prompt);
        }
      })
    }
  }

  showLoading() {                                 //Loading message using LoadingController
    let loading;
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
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