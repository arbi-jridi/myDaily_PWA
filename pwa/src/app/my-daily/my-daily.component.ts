import { routes } from './../app.routes';
import { GeolocationService } from './../services/geolocation.service';
import { days } from './../logic/days';
import { DataService } from './../services/data.service';
import { Daily } from './../logic/daily';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { RouterModule } from '@angular/router'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {Component, inject} from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarModule,
  MatSnackBarRef,
} from '@angular/material/snack-bar';




import { FormsModule, } from '@angular/forms';
import { types } from 'util';
import { BooleanInput } from '@angular/cdk/coercion';
import { Routine } from '../logic/routine';
import { HttpClientModule } from '@angular/common/http';



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
    MatSlideToggleModule,
    HttpClientModule,
    MatRadioModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './my-daily.component.html',
  styleUrl: './my-daily.component.css'
})
export class MyDailyComponent {


  days: days['name'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  types=["work","holiday"];
  daily= new Daily("1","Monday");
  location:any;
  ratingEnabled: Boolean =false;
  checked: Boolean =false;
  formtype:  "editing" |"inserting" = "inserting";
  id:any

  constructor(public Data: DataService , private router:Router,private Geolocation :GeolocationService,private _snackBar: MatSnackBar, private route :ActivatedRoute){}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['id']){
        this.id=params['id']
        console.log(this.id);
        this.Data.getMyDaily(this.id,(response:any)=>{
          this.daily=response
          this.formtype= 'editing'
          if(this.daily.rating)
          {
            this.ratingEnabled=true;
          }
        })
      }     
    })
  }

  save(){
    let resultFunction = (result:boolean)=>{
      if(result){
        this._snackBar.open('Daily saved successfully', 'Close', {
          duration: 3500,
        });
        this.router.navigate(['/']);
      }
      else{
        this._snackBar.open('Error saving daily', 'Close', {
          duration: 3500,
        });
      }
    }
    if(this.formtype=="inserting"){
      let {_id, ...insertedDaily} = this.daily;  
    this.Data.save(insertedDaily,resultFunction)
    }
    else{
      this.Data.save(this.daily,resultFunction)
    }
  }

  cancel(){
    this.router.navigate(['/']);
  }

  delete(){
    if (!confirm('Are you sure you want to delete this daily entry?')) {
      return;
    }
    
    this.Data.deleteDaily(this.id).then(() => {
      this._snackBar.open('Daily Deleted successfully', 'Close', {
        duration: 3500,
      });
      this.router.navigate(['/']);
    }).catch((error) => {
      this._snackBar.open('Error deleting daily', 'Close', {
        duration: 3500,
      });
      console.error('Delete failed:', error);
    });
  }

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
