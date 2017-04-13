import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import {Auth} from '../../providers/auth';
import { HomePage } from '../home/home';
import { Upcoming } from '../upcomingTest/upcoming';
import { Http } from '@angular/http';
import { viewTest } from '../viewTest/viewTest';
import {Chart} from 'chart.js';


@Component({
  selector: 'page-domainResult',
  templateUrl: 'domainResult.html'
})

export class DomainResult {

  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;

  chartOptions: any = {
      scaleShowVerticalLines: false,
      responsive: true
  };
 

  testType: string;
  start: number;
  count: number;
  values: any;
  items = [];
  allItems = [];
  allDates = [];
  name: string;
  loading: any;
  testResult:any;

  link = this.auth.mainUrl + 'tests/getbytest/';
  linkAll = this.auth.mainUrl + "tests/getbytest/complete/";
  
  constructor(private navCtrl: NavController, private http: Http, public navParams: NavParams,private alertCtrl: AlertController, 
              private loadingCtrl: LoadingController, private auth: Auth) {


    this.testType = this.navParams.get('testType');         //recieve data from domainPage using NavParams
    this.name = this.navParams.get('name');

    if(this.auth.online){

        this.start = 0;                                         //Position and ammount of tests which are being
        this.count = 15;                                        //requested from the database
        
        this.values = JSON.stringify({start: this.start, count: this.count, test_type: this.testType});

        this.http.post(this.link, this.values).map(res => res.json()).subscribe(      //request a certain ammount from said position
          (data) => {                                                                 //of tests from the database

            for (let i = 0; i < Math.min(this.count, data.length); i++) {             //if there are less tests than requested,
              this.items.push(data[i]);                                               //display only the available ones 
            }
            
            this.auth.add(data.splice(0,2), "domain " + this.testType)
            
          },
          err => {
            this.showError(err);
          })

      }else{
          this.auth.retrieve("domain " + this.testType).then(doc => {
            this.items = doc;
          })
      }

      if(this.auth.online){

      let valuesAll = JSON.stringify({start: 0, count: 100, test_type: this.testType});
                                                
    this.http.post(this.linkAll, valuesAll).map(res => res.json()).subscribe(      //request all tests from the database
      (data) => {

        let month;
        let date;

        for (let i = 0; i < Math.min(this.count, data.length); i++) {          
          this.allItems.push(parseInt(data[i].data));                  //split the recieved string by space
                                                                                    //and take the second element which is a number       
          if(month != data[i].date_created){
            month = data[i].date_created;
            date = auth.dateChange(month);
            date = date.split(" ")[0];
            this.allDates.push(date); 
         }
         else{
           this.allDates.push(" "); 
         } 
        }                           

        this.lineChart = new Chart(this.lineCanvas.nativeElement, {                  //line chart inicialisation and options
 
          type: 'line',
          data: {
            labels: this.allDates,
            datasets: [
              {
                label: this.name + " Test Results",
                fill: true,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.allItems,
                spanGaps: false,
              }
            ]
          }
        });

      },
      err => {
        // this.showError(err);
      })

    }
  }

  doInfinite(infiniteScroll) {                                                      //request tests on reaching the bottom
                                                                                    //of the page
      this.start = this.start + this.count;
      this.values = JSON.stringify({start: this.start, count: this.count});

      setTimeout(() => {

        this.http.post(this.link, this.values).map(res => res.json()).subscribe(
          (data) => {

          if(data.length == 0){                                                     //if there are no more tests,
            infiniteScroll.enable(false);                                           //disable the infinite scroll
          }

          for (let i = 0; i < Math.min(this.count, data.length); i++) {
              this.items.push(data[i]);
          }

          this.start = this.start - this.count + Math.min(this.count, data.length)   //Adjust the position at which
                                                                                     //tests are being requested from the database
          },
          err => {
            this.start = this.start - this.count;
            this.showError(err);
          })

        infiniteScroll.complete();
      }, 500); 
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