import { Component, ViewChild, OnInit } from '@angular/core';
import {
  ionicBootstrap, Platform, Nav, Events, MenuController,
  NavController
} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TabsComponent } from "./components/tabs/tabs";
import { RoutePage } from "./pages/route/route";
import { AccountPage } from "./pages/account/account";
import { LoginPage } from "./pages/login/login";
import { SignupPage } from "./pages/signup/signup";
import { UserDataService } from "./providers/user-data-service/user-data-service";
import { AboutPage } from "./pages/about/about";

interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@Component({
  templateUrl: 'build/app.html'
})
export class AtrriveApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;
  
  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageObj[] = [
    { title: 'מסלול חדש', component: TabsComponent, icon: 'map' },
    { title: 'דרכים', component: TabsComponent, index: 1, icon: 'contacts' },
    { title: 'נתוני משתמש', component: TabsComponent, index: 2, icon: 'map' },
    { title: 'אודות', component: TabsComponent, index: 3, icon: 'information-circle' },
  ];
  loggedInPages: PageObj[] = [
    { title: 'חשבון משתמש', component: AccountPage, icon: 'person' },
    { title: 'התנתק', component: TabsComponent, icon: 'log-out' }
  ];
  loggedOutPages: PageObj[] = [
    { title: 'התחבר', component: LoginPage, icon: 'log-in' },
    { title: 'הרשם', component: SignupPage, icon: 'person-add' }
  ];
  
  // specifies the root page to be shown when the app is launched
  rootPage: any = RoutePage;
  
  constructor(public events: Events,
              public userData: UserDataService,
              public menu: MenuController,
              platform: Platform) {
    // Call any initial plugins when ready
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.nav.push(TabsComponent);
    });
    
    // decide which menu items should be hidden by current login status stored in local storage
    // this.userData.hasLoggedIn().then((hasLoggedIn) => {
    //   this.enableMenu(hasLoggedIn === 'true');
    // });
    
    this.enableMenu(true);
    
    this.listenToLoginEvents();
  }
  
  openPage(page: PageObj) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, { tabIndex: page.index });
      
    } else {
      this.nav.setRoot(page.component);
    }
    
    if (page.title === 'Logout') {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userData.logout();
      }, 1000);
    }
  }
  
  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });
    
    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });
    
    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }
  
  enableMenu(loggedIn) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }
}

ionicBootstrap(AtrriveApp, [UserDataService], {
  backButtonIcon: "arrow-forward"
});
