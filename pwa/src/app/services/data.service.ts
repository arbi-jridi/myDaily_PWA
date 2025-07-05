import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Daily } from '../logic/daily';
import { PlaceLocation } from '../logic/placeLocation';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
  public apiUrl = 'https://mydaily-pwa.onrender.com';
  public dailyEntity = '/daily';

  getList(callback:Function) {
/*     const list = [
      new Daily('1','monday', 'Tunis', new PlaceLocation("avenue de Revolution,Tunis")),
      new Daily('2','tuesday', 'Ben Arous', new PlaceLocation("avenue de france,Ben Arous")),
      new Daily('3','wednesday', 'Ariana', new PlaceLocation("avenue de la liberté,Ariana")),
      new Daily('4','thursday', 'Sousse', new PlaceLocation("boulevard de l'environnement,Sousse"))
    ];
    return Promise.resolve(list); */
    this.http.get<Daily[]>(`${this.apiUrl}${this.dailyEntity}`).subscribe(
      response=>{
        callback(response);
      },
      (error:any)=>{
        console.error('Error fetching daily list:', error);
      }
    )  ;
  }

  getMyDaily(dayId:string,callback:Function){
    this.http.get<Daily>(`${this.apiUrl}${this.dailyEntity}/${dayId}`).subscribe(
      response=>callback(response),
      (error:any)=>{
        console.error('Error Getting daily:', error);
      }
    );
  }
  
  deleteDaily(dayId:string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.delete<Daily>(`${this.apiUrl}${this.dailyEntity}/${dayId}`).subscribe({
        next: response => {
          console.log('Daily deleted successfully:', response);
          resolve(true);
        },
        error: (error: any) => {
          console.error('Error deleting Daily:', error);
          reject(error);
        }
      });
    });
  }

  save(daily:any,callback:Function){
    if(daily._id){
      this.http.put<Daily>(`${this.apiUrl}${this.dailyEntity}/${daily._id}`,daily).subscribe({
        next:response=>{
          callback(true);
        },
        error:error=>{ 
          console.error('Error saving daily:', error);
        }
      });
    }
    else{
      this.http.post<Daily>(`${this.apiUrl}${this.dailyEntity}`,daily).subscribe(
      response=>callback(true),
      (error:any)=>{
        console.error('Error saving daily:', error);
      }
    );
    }
  }
}
