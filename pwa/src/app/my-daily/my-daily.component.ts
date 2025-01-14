import { GeolocationService } from './../services/geolocation.service';
import { days } from './../logic/days';
import { DataService } from './../services/data.service';
import { Daily } from './../logic/daily';
import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { FormsModule, } from '@angular/forms';
import { types } from 'util';
import { BooleanInput } from '@angular/cdk/coercion';
import { Routine } from '../logic/routine';



@Component({
  selector: 'my-daily',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatSlideToggleModule
  ],
  templateUrl: './my-daily.component.html',
  styleUrl: './my-daily.component.css'
})
export class MyDailyComponent {


  days: days['name'][] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  types=["work","holiday"];
  daily= new Daily("1","monday");
  location:any;
  ratingEnabled: Boolean =false;
  checked: Boolean =false;

  constructor(public Data: DataService , private router:Router,private Geolocation :GeolocationService){}

  ngOnInit() {}

  save(){}
  cancel(){}
  getLocation(){
    return this.Geolocation.requestLocation((location:GeolocationCoordinates|null)=>
    {
      if (location){
        this.daily.location!.longitude=location.longitude;
        this.daily.location!.latitude=location.latitude;
        console.log(this.daily.location)
      }
    
    })
  }

  dailyRatingChanged(checked: boolean) {
    if (checked) {
      this.daily.routine= new Routine()
    }
    }


}
