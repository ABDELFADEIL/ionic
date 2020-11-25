import { Component } from '@angular/core';
/*import { Network } from '@ionic-native/network/ngx';*/
import { Plugins } from '@capacitor/core';

const { Network } = Plugins;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  message;
/*
  constructor(private network: Network) {
    this.onDisconnect();
  }

 */
  constructor() {
    Network.addListener('networkStatusChange', (status) => {
      console.log("Le status de connextion a changé ", status);
      this.message = status.connected ? 'Connecté': 'Déconnecté';
    });
    this.start();
  }
  onDisconnect(){

  }
  async start(){
    let status = await Network.getStatus();
    if (status.connected){
      this.message = "connecté"
    }
  }

}
