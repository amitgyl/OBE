import { Component, OnInit } from '@angular/core';
import { RoomsAvailableService } from '../../shared/rooms-available.service';
@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css']
})
export class MainPanelComponent implements OnInit {
  availabilty: any;
  arrivalDate: any;
  departureDate: any;
  numberOfNights: any;
  arrNightStay: any[]
  monthNumber: any;
  month1Number: any;
  month2Number: any;
  month1: string;
  month2: string;
  year1: any;
  year2: any;
  month: string[];
  arrWeeksThisMonth: any[];
  arrWeeksNextMonth: any[];
  arrThisMonth: any[];//array storing info about current month
  arrNextMonth: any[];//array storing info about next month
  arrAvailabilty: any[];

  applyClass(a){
   const isStay = a.isStaying 
   const isArrive = a.isArrivalDate 
   const isDepart =  a.isDeparture
   const isNotAvailable = (a.availability < 1)    
   return {
     's-d': (isStay || isArrive || isDepart), 
     'arrival': isArrive, 
     'departure': isDepart, 
     'not-available': isNotAvailable, 
     'n-a': isNotAvailable,
     'r-a': !(isStay || isArrive || isDepart) && a.day
    }
  }

  constructor(private roomsAvailable: RoomsAvailableService) {

  }

  ngOnInit() {
    this.setStayNights()
    this.setCalendar()
    this.setMonth()
  }

  setStayNights() {
    this.availabilty = this.roomsAvailable.getAvailibility(this.arrivalDate, this.departureDate);
    this.arrivalDate = this.stringToDate("5/25/2017", "mm/dd/yyyy", "/")
    this.departureDate = this.stringToDate("5/30/2017", "mm/dd/yyyy", "/")
    this.numberOfNights = (this.departureDate - this.arrivalDate) / (1000 * 60 * 60 * 24)
    this.arrNightStay = new Array()
    for (var i = 0; i < this.numberOfNights - 1; i++) {
      this.arrNightStay[i] = new Date(this.arrivalDate.getTime() + ((i + 1) * (86400000)))
    }
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
    
    this.arrWeeksThisMonth = this.fillMonth(this.arrThisMonth,this.arrWeeksThisMonth)
    this.arrWeeksNextMonth = this.fillMonth(this.arrNextMonth,this.arrWeeksNextMonth)
    

  }

  fillMonth(arrCalMonth,arWeeks){
    var dayNummer = 0
    var dayNummer1 = 0
    //dayNummer is for the td and dayNummer1 is for index of element in availbilty array
    arWeeks = new Array();

    for (var i = 1; i < 7; i++) {
      var arDays = new Array();
      for (var j = 1; j < 8; j++) {       
        if ((dayNummer1<arrCalMonth.length) && (dayNummer%7 == this.stringToDate(arrCalMonth[dayNummer1].date,"mm/dd/yyyy","/").getDay()) ){          
          arrCalMonth[dayNummer1].day = this.stringToDate(arrCalMonth[dayNummer1].date,"mm/dd/yyyy","/").getDate()
          
          if (this.stringToDate(arrCalMonth[dayNummer1].date,"mm/dd/yyyy","/").getTime() == this.arrivalDate.getTime()){
            arrCalMonth[dayNummer1].isArrivalDate = true
          }
          
          if (this.stringToDate(arrCalMonth[dayNummer1].date,"mm/dd/yyyy","/").getTime() == this.departureDate.getTime()){
            arrCalMonth[dayNummer1].isDeparture = true
          }
          if (dayNummer1>0){
            if (arrCalMonth[dayNummer1].availability<1){
              arrCalMonth[dayNummer1-1].closedForDeparture = true                    
            }
          }
          for (var k = 0; k < this.arrNightStay.length; k++) {
            if (this.arrNightStay[k].getTime() == this.stringToDate(arrCalMonth[dayNummer1].date, "mm/dd/yyyy", "/").getTime()) {
              arrCalMonth[dayNummer1].isStaying = true
            }           
          }          
          arDays.push(arrCalMonth[dayNummer1])
          dayNummer1++
        } 
        else{
          var x = new Array()
          arDays.push(x)
        }                
        dayNummer++
      }
      arWeeks.push(arDays)
    }    
    return arWeeks
  }

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
