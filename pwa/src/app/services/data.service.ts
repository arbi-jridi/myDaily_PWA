import { Injectable } from '@angular/core';
import { Daily } from '../logic/daily';
import { PlaceLocation } from '../logic/placeLocation';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getList(): Promise<Daily[]> {
    const list = [
      new Daily('1','monday', 'Tunis', new PlaceLocation("avenue de Revolution,Tunis")),
      new Daily('2','tuesday', 'Ben Arous', new PlaceLocation("avenue de france,Ben Arous")),
      new Daily('3','wednesday', 'Ariana', new PlaceLocation("avenue de la liberté,Ariana")),
      new Daily('4','thursday', 'Sousse', new PlaceLocation("boulevard de l'environnement,Sousse"))
    ];
    return Promise.resolve(list);
  }
}
