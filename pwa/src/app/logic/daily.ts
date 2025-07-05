import { days } from './days';
import { PlaceLocation } from './placeLocation';
import { Routine } from './routine';

type Day = days["name"];
type Type = 'work' | 'holiday' ;
export class Daily {
    machineId!: string;
    dateTime!: Date;
    time!: Date;
    type : Type= "work";
    rating:number =0;
    notes: string="";
    routine: Routine | null=null;
    constructor(public _id:string|null=null, public day:Day,public place:string="",public location:PlaceLocation | null=null)
   {
    this.routine = new Routine();
    if(location == null){
        this.location = new PlaceLocation();
    }
   }
}    