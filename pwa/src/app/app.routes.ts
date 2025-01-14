import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { MyDailyComponent } from './my-daily/my-daily.component';

export const routes: Routes = [
    { path: '', component:ListComponent },
    { path: 'daily', component:MyDailyComponent },
    { path: 'daily/:id', component:MyDailyComponent },
    { path: '**', redirectTo: '' }
];
