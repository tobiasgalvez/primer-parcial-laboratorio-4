import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideFirebaseApp(() => initializeApp({"projectId":"primer-parcial-e8c6b","appId":"1:873726604068:web:999c91785fcff4029c79b1","storageBucket":"primer-parcial-e8c6b.appspot.com","apiKey":"AIzaSyB-niiLHnuxfs_tgfBE_lgH7Vw6Vxhb68k","authDomain":"primer-parcial-e8c6b.firebaseapp.com","messagingSenderId":"873726604068"})), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore()),
    provideHttpClient(),
  
  
  ]
};
