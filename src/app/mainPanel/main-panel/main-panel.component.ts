import { Component, OnInit } from '@angular/core';
import {RoomsAvailableService} from '../../shared/rooms-available.service';
@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css']
})
export class MainPanelComponent implements OnInit {
 txtSelectRooms = "Select Rooms";
 availabilty: any;
 arrivalDate: any;
 departureDate: any;
 monthNumber: any;
 month1: string;
 month2: string;
 year1: any;
 year2: any;
 month: string[];

  constructor(private roomsAvailable: RoomsAvailableService) { 

  }

  ngOnInit() {
    this.availabilty = this.roomsAvailable.getAvailibility(this.arrivalDate,this.departureDate);
    this.setMonth();
  }

  setMonth(){
    this.month =  new Array();
    this.month[0] = "January";
    this.month[1] = "February";
    this.month[2] = "March";
    this.month[3] = "April";
    this.month[4] = "May";
    this.month[5] = "June";
    this.month[6] = "July";
    this.month[7] = "August";
    this.month[8] = "September";
    this.month[9] = "October";
    this.month[10] = "November";
    this.month[11] = "December";
    this.month[12] = "January";

    if (this.monthNumber==undefined){
      var d = new Date();
      this.monthNumber = d.getMonth();
      this.year1 = d.getFullYear();
    }
    this.month1 = this.month[this.monthNumber];
    this.month2 = this.month[this.monthNumber+1];
    if (this.monthNumber == 11){
      this.year2 = this.year1+1;
    }
    else{
      this.year2 = this.year1;
    }
  }

  showNextMonth(){
    if (this.monthNumber == 11){
      this.monthNumber = 0;
      this.year1++;
    }
    else{
      this.monthNumber++;      
    }
    this.setMonth(); 
  }
  showPreviousMonth() {
    var d = new Date();


    if (this.monthNumber <= d.getMonth() && this.year1 <= d.getFullYear()) {

    }
    else {
      if (this.monthNumber == 0) {
        this.monthNumber = 11;
        this.year1--;
      }
      else {
        this.monthNumber--;
      }
      this.setMonth();
    }
  }
}
