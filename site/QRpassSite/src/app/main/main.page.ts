import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  notifications:Observable<any>;

  constructor(
    private navCtrl: NavController,
    public afd: AngularFireDatabase, 
    public http: HttpClient
  ) { 
    this.notifications = this.afd.list('guests');
  }

  ngOnInit() {
    
  }

  GoToProfilePage() {
    this.navCtrl.navigateBack('/GuestProfile');
  }

}
