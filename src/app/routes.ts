import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TopNavComponent } from './topNav/top-nav/top-nav.component';
import { LeftPanelComponent } from './leftPanel/left-panel/left-panel.component';
import { MainPanelComponent } from './mainPanel/main-panel/main-panel.component';
import { StayDatesComponent } from './leftPanel/left-panel/stayDates/stay-dates/stay-dates.component';
import { SelectDatesComponent } from './leftPanel/left-panel/stayDates/stay-dates/selectDates/select-dates/select-dates.component';
import { SpecifyRoomsAndGuestsComponent } from './leftPanel/left-panel/stayDates/stay-dates/specifyRoomsAndGuests/specify-rooms-and-guests/specify-rooms-and-guests.component';
import { PromoCodeComponent } from './leftPanel/left-panel/stayDates/stay-dates/promoCode/promo-code/promo-code.component';
import { CancelBookingComponent } from './leftPanel/left-panel/cancelBooking/cancel-booking/cancel-booking.component';

export const appRoutes: Routes = [
    // {path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },
    // {path: 'events', component: EventsListComponent, resolve: {events:EventsListResolverService}},
    // {path: 'event/:id', component: EventDetailsComponent, canActivate:[EventRouteActivatorService]},
    // {path: '404', component: Errror404Component},
    // {path: '', redirectTo:'events', pathMatch: 'full'},
    // {path: 'user', loadChildren: 'app/user/user.module#UserModule'}
]