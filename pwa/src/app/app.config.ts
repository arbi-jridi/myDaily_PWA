import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),provideAnimations(),provideHttpClient(),{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3500}},MatSnackBarModule]
};
