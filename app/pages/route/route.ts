import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapDirective } from "../../components/map/map";

/*
 Generated class for the RoutePage page.
 
 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/route/route.html',
  directives: [MapDirective]
})
export class RoutePage {
  
  public originRoadName: string;
  public geocoder: google.maps.Geocoder;
  public results: Array<any>;
  
  constructor() {
    this.originRoadName = "";
    this.geocoder = new google.maps.Geocoder();
    this.results = [];
  }
  
  onSubmit() {
    
    this.results = [];
    
    this.geocoder.geocode( {address: this.originRoadName}, (destination, status) => {
      if (status === google.maps.GeocoderStatus.OK) { // destination address found by the geocoder
        this.results = destination.slice(0, 4); // show top 4 results
      }
      else if (status === google.maps.GeocoderStatus.ZERO_RESULTS)
      { // destination address not found by the geocoder
        alert("Destination not found");
      }
      else {
        console.log(status);
      }
    })
  }
  
}
