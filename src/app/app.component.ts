import { AuthService } from './auth/auth.service';
import { Component } from '@angular/core';
import { Plugins, Capacitor } from '@capacitor/core'
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
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
      })
    }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
