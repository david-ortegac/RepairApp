import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy },
    provideFirebaseApp(() => initializeApp({ projectId: "repairapp-7c870", appId: "1:784004400031:web:04c625072a266eb097b3aa", storageBucket: "repairapp-7c870.firebasestorage.app", apiKey: "AIzaSyAmauQej1Dd3y_Ok1j_dGujCdZ_TSo81qA", authDomain: "repairapp-7c870.firebaseapp.com", messagingSenderId: "784004400031", measurementId: "G-D34EZSPF5X" })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())],
  bootstrap: [AppComponent],
})
export class AppModule { }
