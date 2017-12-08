import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// FormsModule
import { FormsModule } from '@angular/forms';
// Firebase Module
import { environment } from '../environments/environment.prod';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
// Components
import { AppComponent } from './app.component';
import { ItemsComponent } from './components/items/items.component';
// Services
import { ItemService } from './services/item.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddItemComponent } from './components/add-item/add-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    NavbarComponent,
    AddItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'your-APP-name-here'),
    AngularFirestoreModule
  ],
  providers: [ ItemService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
