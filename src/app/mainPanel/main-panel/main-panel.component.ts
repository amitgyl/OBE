import { Component, OnInit } from '@angular/core';
import { RoomsAvailableService } from '../../shared/rooms-available.service';
@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css']
})
export class MainPanelComponent implements OnInit {
  fakeArray = new Array(12);
  txtSelectRooms = "Select Rooms";
  availabilty: any;
  arrivalDate: any;
  departureDate: any;
  monthNumber: any;
  month1Number: any;
  month2Number: any;
  month1: string;
  month2: string;
  year1: any;
  year2: any;
  month: string[];
  arrDays: any[];
  arrWeeks: any[];
  arrThisMonth: any[];
  arrNextMonth: any[];
  arrAvailabilty: any[];

  constructor(private roomsAvailable: RoomsAvailableService) {

  }

  ngOnInit() {
    this.availabilty = this.roomsAvailable.getAvailibility(this.arrivalDate, this.departureDate);
    this.setCalendar();
    this.setMonth();
  }

  setCalendar() {
    var d = new Date()
    this.arrThisMonth = new Array()
    this.arrNextMonth = new Array()
    this.month1Number = d.getMonth()
    this.month2Number = this.month1Number + 1
    for (var i = 0; i < this.availabilty.availability.availabilityItem.length; i++) {
      if (this.month1Number == this.stringToDate(this.availabilty.availability.availabilityItem[i].date, "mm/dd/yyyy", "/").getMonth()) {
        this.arrThisMonth.push(this.availabilty.availability.availabilityItem[i])
      }
      if (this.month2Number == this.stringToDate(this.availabilty.availability.availabilityItem[i].date, "mm/dd/yyyy", "/").getMonth()) {
        this.arrNextMonth.push(this.availabilty.availability.availabilityItem[i])
      }
    }
    // console.log ("thisMonth")
    // console.log (this.arrThisMonth[0].date)


    this.arrAvailabilty = this.availabilty.availability
    // console.log (this.arrAvailabilty)
    var dayNummer = 0
    var dayNummer1 = 0
    var thisMonthLength = 30;
    // this.arrThisMonth = new Array(thisMonthLength);

    this.arrWeeks = new Array(this.arrDays);
    for (var i = 1; i < 7; i++) {
      this.arrDays = new Array();
      for (var j = 1; j < 8; j++) {
        if (dayNummer1<this.arrThisMonth.length && dayNummer%7 == this.stringToDate(this.arrThisMonth[dayNummer1].date,"mm/dd/yyyy","/").getDay() ){          
          console.log(this.stringToDate(this.arrThisMonth[dayNummer1].date,"mm/dd/yyyy","/").getDay())
          console.log("dayNummer"+dayNummer%7)
          this.arrDays.push(dayNummer1+1)
          dayNummer1++
          console.log("1dayNummer"+dayNummer1)
        }        
        dayNummer++
      }
      this.arrWeeks.push(this.arrDays)
    }
    console.log(this.arrWeeks)
  }



  // setCal(ar1, ar2) {
  //   var date = 1
  //   console.log(ar1)
  //   for (var i = 0; i < ar1.length; i++) {
  //     for (var j = 0; j < ar2.length; j++) {
  //       ar2[i] = date
  //       date++
  //     }
  //   }
  // }

  setMonth() {
    this.month = new Array();
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

    if (this.monthNumber == undefined) {
      var d = new Date();
      this.monthNumber = d.getMonth();
      this.year1 = d.getFullYear();
    }
    this.month1 = this.month[this.monthNumber];
    this.month2 = this.month[this.monthNumber + 1];
    if (this.monthNumber == 11) {
      this.year2 = this.year1 + 1;
    }
    else {
      this.year2 = this.year1;
    }
  }

  showNextMonth() {
    if (this.monthNumber == 11) {
      this.monthNumber = 0;
      this.year1++;
    }
    else {
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


  stringToDate(_date, _format, _delimiter) {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    return formatedDate;
  }
}
