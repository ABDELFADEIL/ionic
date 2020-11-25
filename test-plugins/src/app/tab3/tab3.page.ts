import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
   lat;
   lag;
  constructor() {
    this.getPosition();
  }

  async getPosition(){
    let cords = await Geolocation.getCurrentPosition();
    this.lat = cords.coords.latitude;
    this.lag = cords.coords.longitude;
    console.log(cords);
  }

  watchPosition(){
    const  wait = Geolocation.watchPosition( {},
        (position, err)=> {
      console.log(position);
    });
  }
}
