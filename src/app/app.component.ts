import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Plugins, Capacitor, AppState } from '@capacitor/core'
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private authSub: Subscription;
  private previousAuthState = false;

  constructor(
    private authService: AuthService,
    private platform: Platform,
    private router: Router
  ) {}

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }
    });
    Plugins.App.addListener('appStateChange', this.checkAuthOnResume.bind(this));
  }

  ngOnInit() {
    this.authSub = this.authService.userIsAuthenticated.subscribe(isAuth => {
      if (!isAuth && this.previousAuthState !== isAuth) {
        this.router.navigateByUrl('/auth');
      }
      this.previousAuthState = isAuth;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  private checkAuthOnResume(state: AppState) {
    if (state.isActive) {
      this.authService
        .autoLogin()
        .pipe(take(1))
        .subscribe(success => {
          if (!success) {
            this.onLogout();
          }
        });
    }
  }

  ngOnDestroy() {
    if (this.authSub) this.authSub.unsubscribe();
  }
}
