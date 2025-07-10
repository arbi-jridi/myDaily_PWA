import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router'; 
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarModule,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { SwUpdate,SwPush } from '@angular/service-worker';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,MatToolbarModule ,MatButtonModule, MatIconModule,RouterModule,MatSnackBarModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'My Daily pwa';

  constructor(private snackBar: MatSnackBar,private  swUpdate:SwUpdate,private swPush :SwPush){}

  UpdateNetworkStatus(){
    if(navigator.onLine){
      (document.querySelector('body') as any).style.filter="grayscale(0)";
      this.setSnackbarColor("green");
      this.snackBar.open("You are online 📶,You can save your daily !", "", { duration: 3000 , panelClass: ['snackbar-success'] } )
    }else{
      (document.querySelector('body') as any).style.filter="grayscale(1)";
      this.setSnackbarColor("red");
      this.snackBar.open("You are offline 🚫,Some features may not work!", "", { duration: 3000 , panelClass: ['snackbar-error'] } )
    }
  }

  ngOnInit() {
    this.getMachineId();
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate();
      this.swUpdate.versionUpdates.subscribe(update => {
          if (update.type=="VERSION_READY") {
            const sb = this.snackBar.open("There is an updated version available ✅", "Install Now 📥", {duration: 40000 , verticalPosition: 'bottom', horizontalPosition: 'center'});
            sb.onAction().subscribe( () => {
                //TODO: UX CHECK before reloading
                location.reload();
            })
          }
      })
    }


    this.UpdateNetworkStatus();
    window.addEventListener('online', () => this.UpdateNetworkStatus());
    window.addEventListener('offline', () => this.UpdateNetworkStatus());
    if (window.matchMedia('(display-mode: browser').matches) {
      // We are in the browser
      if ('standalone' in navigator) {
        // only available in Safari
        this.snackBar.open("You can install this PWA App !, use Share > Add to Home Screen", 
            "", { duration: 3000 , verticalPosition: 'bottom', horizontalPosition: 'center' })
      } else {
        // it's not Safari
        window.addEventListener("beforeinstallprompt", event => {
          event.preventDefault();
          const sb = this.snackBar.open("This is a PWA !, You can install this App",
            "Install", { duration: 10000 , verticalPosition: 'bottom', horizontalPosition: 'center' });
          sb.onAction().subscribe( () => {
             (event as any).prompt();
             (event as any).userChoice.then( (result: any) => {
                if (result.outcome == "dismissed") {
                  // TODO:
                } else {
                  // TODO:
                }
             })
          });
        })
      }
    }
  }

  setSnackbarColor(color: string) {
    document.documentElement.style.setProperty('--snackbar-bg', color);
  }

  registerForPush(){
    if(this.swPush.isEnabled){
    Notification.requestPermission((permission) => {
      if (permission === "granted") {
        this.snackBar.open("Push notifications are Enabled 📲", "", { duration: 3000 , verticalPosition: 'bottom', horizontalPosition: 'center' });
        this.swPush.requestSubscription({
          serverPublicKey: ""
        }).then((subscription) => {
          console.log("Subscription successful", subscription);
        }).catch((err) => {
          console.log("Subscription failed", err);
        })
      }
    })
    }
  }

   getMachineId() {
    
    let machineId = localStorage.getItem('MachineId');
    
    if (!machineId) {
        machineId = crypto.randomUUID();
        console.log("Machine ID: " + machineId);
        localStorage.setItem('MachineId', machineId);
    }
    console.log("Machine ID: " + machineId);
    return machineId;
}

}
