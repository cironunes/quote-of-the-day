import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';

import { AppComponent } from './app.component';

const firebaseConfig = {
  apiKey: "AIzaSyBJ7aRwxKnl4S9QhCwwZs2mgYcVHPFoZ28",
  authDomain: "super-quote-of-the-day.firebaseapp.com",
  databaseURL: "https://super-quote-of-the-day.firebaseio.com",
  storageBucket: "super-quote-of-the-day.appspot.com"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Facebook,
  method: AuthMethods.Popup
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
