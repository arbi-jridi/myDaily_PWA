
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
import { HttpClientModule } from '@angular/common/http';



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

constructor(public Data: DataService , private router:Router){}

ngOnInit(){
  this.Data.getList((data:any) => {this.list = data})
  console.log('hello',this.list.length)
}

seeDetails(daily:Daily){
this.router.navigate(['/daily',daily._id])
}

}
