import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TopNavComponent } from './topNav/top-nav/top-nav.component';
import { LeftPanelComponent } from './leftPanel/left-panel/left-panel.component';
import { MainPanelComponent } from './mainPanel/main-panel/main-panel.component';
import { StayDatesComponent } from './leftPanel/left-panel/stayDates/stay-dates/stay-dates.component';
import { SelectDatesComponent } from './leftPanel/left-panel/stayDates/stay-dates/selectDates/select-dates/select-dates.component';
import { SpecifyRoomsAndGuestsComponent } from './leftPanel/left-panel/stayDates/stay-dates/specifyRoomsAndGuests/specify-rooms-and-guests/specify-rooms-and-guests.component';
import { PromoCodeComponent } from './leftPanel/left-panel/stayDates/stay-dates/promoCode/promo-code/promo-code.component';
import { CancelBookingComponent } from './leftPanel/left-panel/cancelBooking/cancel-booking/cancel-booking.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    LeftPanelComponent,
    MainPanelComponent,
    StayDatesComponent,
    SelectDatesComponent,
    SpecifyRoomsAndGuestsComponent,
    PromoCodeComponent,
    CancelBookingComponent
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
