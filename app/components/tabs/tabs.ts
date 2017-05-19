import { Component } from '@angular/core';
import { NavParams } from "ionic-angular";
import { AboutPage } from "../../pages/about/about";
import { UserDataPage } from "../../pages/user-data/user-data";
import { RoadsPage } from "../../pages/roads/roads";
import { RoutePage } from "../../pages/route/route";

@Component({
  templateUrl: 'build/components/tabs/tabs.html'
})
export class TabsComponent {
  // set the root pages for each tab
  tab1Root: any = RoutePage;
  tab2Root: any = RoadsPage;
  tab3Root: any = UserDataPage;
  tab4Root: any = AboutPage;
  mySelectedIndex: number;
  
  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
