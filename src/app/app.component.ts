import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController  } from '@ionic/angular';
import { Platform, IonMenu } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Favoritos',
      url: '#',
      icon: 'star'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  @ViewChild('menu', { static: true }) menu: IonMenu;


  constructor(
    private navCtrl: NavController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  logout(){
    this.authService.logout();
    this.navCtrl.navigateRoot('/home');
    this.menu.toggle(true);
  }

  login(){
    this.navCtrl.navigateForward(['/login']);
    this.menu.toggle(true);
  } 
 
  register(){ 
    this.navCtrl.navigateForward(['/register']);
    this.menu.toggle(true);
  }
}
