import { AppUser } from './../models/app-user';
import { UserService } from './user.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router } from "@angular/router";
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || "/";
    localStorage.setItem("returnUrl", returnUrl);

    this.afAuth.auth
      .signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser>{
    return this.user$
      .switchMap(user => {
        if(user)
          return this.userService.get(user.uid).valueChanges();
        else
          return Observable.of(null);
      });
  }

}
