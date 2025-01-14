import { TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { PlaceLocation } from '../logic/placeLocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

requestLocation(callback:Function)
{
  //w3c geolocation api
  navigator.geolocation.getCurrentPosition(
    position=>{callback(position.coords)},
    error=>{callback(null)});
}

getMapLink(location:PlaceLocation){
  //return a universel link to a map
  let query ="";
  if(location.latitude && location.longitude){
    query=`${location.latitude},${location.longitude}`;
  }
  else{
    query = `${location.address},${location.city}`;
  }
  if(/iPad|iPhone|iPod/.test(navigator.userAgent)){
    return `https://maps.apple.com/?q=${query}`;
  }
  return `https://maps.google.com/?q=${query}`;
}
  constructor() { }

 }
