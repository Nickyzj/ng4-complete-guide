import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipes';

  ngOnInit() {
    firebase.initializeApp ({
      apiKey: "AIzaSyCymg90GLygtdBgw0zdWoMpENBUYAer88g",
      authDomain: "ng-recipe-book-fcad3.firebaseapp.com",
    });
  } 

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
