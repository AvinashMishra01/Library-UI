import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './services/auth-service/token.interceptor';

import { routes } from './app.routes';




export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
      provideCharts(withDefaultRegisterables()),
     provideAnimations(), 
     provideHttpClient(withInterceptors([tokenInterceptor])),
    provideToastr({
      preventDuplicates:true,
      timeOut:2500
    }),
    ]
};
