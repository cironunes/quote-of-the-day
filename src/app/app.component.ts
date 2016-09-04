import { Component } from '@angular/core';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <img class="logo" src="assets/quote-of-day.svg">

    <div *ngIf="user && quote">
      <span class="message">"{{quote?.message}}"</span>
      <strong class="author">{{quote?.author}}</strong>
    </div>

    <div>
      <button
        class="btn btn-login"
        *ngIf="!user"
        (click)="login()"
      >
        <img
          class="btn__img"
          width="32" height="32"
          src="assets/facebook.svg"
          alt="Facebook"
        >
        <span class="btn__label">Login with Facebook</span>
      </button>

      <button
        class="btn"
        *ngIf="user"
        (click)="logout()"
      >
        <img
          class="btn__img"
          width="32" height="32"
          [src]="user.photoURL"
          [alt]="user.displayName"
        >
        <span
          class="btn__label"
        >Logout from {{user.displayName}}</span>
      </button>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user = null;
  quotes: FirebaseListObservable<any>;
  quotesSubscription: Subscription;
  quote: any;

  // quote = { message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, recusandae!', author: 'Ciro' };  
  // user = { displayName: 'Ciro Nunes', photoURL: 'assets/ciro.png' };

  constructor(private af: AngularFire) {
    this.af.auth
      .subscribe(user => this._onStateChange(user));
  }

  login() {
    this.af.auth.login();
  }

  logout() {
    this.af.auth.logout();
    this.user = null;
    this.quotesSubscription.unsubscribe();
  }

  _onStateChange(user) {
    this.user = user ? user.auth : this.user; 

    if (this.user) {
      this.quotes = this.af.database.list('quotes', {
        query: {
          limitToLast: 1
        }
      });

      this.quotesSubscription = this.quotes
        .subscribe(quotes => this.quote = quotes[0]);
    }
  }
}
