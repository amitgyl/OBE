import { Component, OnInit } from '@angular/core';
import {RoomsAvailableService} from '../../shared/rooms-available.service';
@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css']
})
export class MainPanelComponent implements OnInit {
 txtSelectRooms = "Select Rooms"
 availabilty: any
 arrivalDate: any
 departureDate: any
 weekdayNames: [
      's',
      'm',
      't',
      'w',
      't',
      'f',
      's'
 ]

  constructor(private roomsAvailable: RoomsAvailableService) { }

  ngOnInit() {
    this.availabilty = this.roomsAvailable.getAvailibility(this.arrivalDate,this.departureDate)
    console.log(this.availabilty)
  }

}
