import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TopNavComponent } from './topNav/top-nav/top-nav.component';
import { LeftPanelComponent } from './leftPanel/left-panel/left-panel.component';
import { MainPanelComponent } from './mainPanel/main-panel/main-panel.component';
import { StayDatesComponent } from './leftPanel/stayDates/stay-dates/stay-dates.component';
import { SelectDatesComponent } from './leftPanel/stayDates/selectDates/select-dates/select-dates.component';
import { SpecifyRoomsAndGuestsComponent } from './leftPanel/stayDates/specifyRoomsAndGuests/specify-rooms-and-guests/specify-rooms-and-guests.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    LeftPanelComponent,
    MainPanelComponent,
    StayDatesComponent,
    SelectDatesComponent,
    SpecifyRoomsAndGuestsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
