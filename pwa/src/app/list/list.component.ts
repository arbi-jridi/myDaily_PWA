import { DataService } from './../services/data.service';
import { Daily } from './../logic/daily';
import { Component, HostListener, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http';
import { GeolocationService } from '../services/geolocation.service';
import { UiService } from '../services/ui.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'list',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatButtonModule,MatIconModule,MatDividerModule,RouterModule,HttpClientModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

hover:boolean = false;
list:Daily[] = [];
filteredList:Daily[] = [];
disabled= false;
machineId:string = localStorage.getItem('MachineId')!;

constructor(public Data: DataService , private router:Router, private geolocation : GeolocationService,private ui: UiService , private snackBar: MatSnackBar){}

ngOnInit(){
  this.Data.getList((data:any) => {
    this.list = data
    this.filteredList = this.list.filter((item:Daily) => item.machineId == this.machineId);
    console.log(this.filteredList);

  })

  this.ui.setTitle("My Daily !");
  this.ui.setThemeColor("#B2D6FD");
  this.onResize();
}

isWide = true;


@HostListener('window:resize')
onResize() {
  this.isWide = window.innerWidth > 380;
}


seeDetails(daily:Daily){
this.router.navigate(['/daily',daily._id])
}

goMap(daily:Daily){
const mapUrl = this.geolocation.getMapLink(daily.location!)
window.open(mapUrl,"_blank")
}

share(daily:Daily){
  const text = `${daily.day}${daily.rating ? ` - ${this.getRatingText(daily.rating)}` : ''}${daily.notes ? ` - ${daily.notes}` : ''}`;
  
  const info = {
    title: daily.day,
    text: text,
    url: window.location.href
  };
  if ('share' in navigator && navigator.canShare())
  {
  navigator.share(info)
  }
  else {
this.snackBar.open("This Navigator dont support sharing !", "", {
  duration: 3000,
  verticalPosition: 'top',
  horizontalPosition: 'center',
});
  }
  }

private getRatingText(rating: number): string {
  switch(rating) {
    case 1: return 'Good Day 🙂';
    case 2: return 'Bad Day 🙁';
    case 3: return 'Neutral Day 😐';
    default: return rating.toString();
  }
}

}
