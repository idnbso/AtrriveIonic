import { Component } from '@angular/core';

/*
  Generated class for the MapDirective component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'map',
  templateUrl: 'build/components/map/map.html'
})
export class MapDirective {
  
  public map: google.maps.Map;
  public isMapIdle: boolean;
  
  constructor() {
  }
  
  ngOnInit(): any {
    this.map = this.createMap();
    this.addMapEventListeners();
  }
  
  addMapEventListeners() {
    
    google.maps.event.addListener(this.map, 'dragstart', () => {
      this.isMapIdle = false;
    });
    google.maps.event.addListener(this.map, 'idle', () => {
      // the following causes the map to refresh on page load or else it won't appear
      google.maps.event.trigger(this.map, 'resize');
      this.isMapIdle = true;
    });
  }
  
  createMap(location: google.maps.LatLng = new google.maps.LatLng(32.003800, 34.770642)) {
    let mapOptions = {
      center: location,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };
    
    let mapEl = document.getElementById('map');
    
    return new google.maps.Map(mapEl, mapOptions);
  }
}
