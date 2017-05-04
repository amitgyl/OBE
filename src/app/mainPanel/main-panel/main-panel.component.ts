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
   const isDisabled =  a.disabled
   const isNotAvailable = (a.availability < 1)    
   return {
     's-d': ((isStay || isArrive || isDepart) && !isDisabled), 
     'arrival': (isArrive && !isDisabled), 
     'departure': (isDepart && !isDisabled), 
     'not-available': (isNotAvailable && !isDisabled), 
     'n-a': (isNotAvailable && !isDisabled), 
     'r-a': ((!(isStay || isArrive || isDepart) && a.day) && !isDisabled)
    }
  }

  constructor(private roomsAvailable: RoomsAvailableService) {

  }

  ngOnInit() {
    this.setStayNights()
      
  }

  setStayNights() {
    this.availabilty = this.roomsAvailable.getAvailibility(this.arrivalDate, this.departureDate);
    if (!this.arrivalDate){
      this.arrivalDate = this.stringToDate("5/25/2017", "mm/dd/yyyy", "/")
    }    
    if (!this.departureDate){
      this.departureDate = this.stringToDate("5/30/2017", "mm/dd/yyyy", "/")
    }  
    this.numberOfNights = (this.departureDate - this.arrivalDate) / (1000 * 60 * 60 * 24)
    this.arrNightStay = new Array()
    for (var i = 0; i < this.numberOfNights - 1; i++) {
      this.arrNightStay[i] = new Date(this.arrivalDate.getTime() + ((i + 1) * (86400000)))
    }
    this.setMonth()  
  }

  setCalendar(month1Number,month2Number) {
    this.arrThisMonth = new Array()
    this.arrNextMonth = new Array()    

    for (var i = 0; i < this.availabilty.availability.availabilityItem.length; i++) {
      if (
          month1Number == this.stringToDate(this.availabilty.availability.availabilityItem[i].date, "mm/dd/yyyy", "/").getMonth()
          && 
          this.year1 == this.stringToDate(this.availabilty.availability.availabilityItem[i].date, "mm/dd/yyyy", "/").getFullYear()
         ) {
        this.arrThisMonth.push(this.availabilty.availability.availabilityItem[i])
      }
      if (
          month2Number == this.stringToDate(this.availabilty.availability.availabilityItem[i].date, "mm/dd/yyyy", "/").getMonth()
          &&
          this.year2 == this.stringToDate(this.availabilty.availability.availabilityItem[i].date, "mm/dd/yyyy", "/").getFullYear()          
         ) {
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
          var d = new Date()
          if (this.stringToDate(arrCalMonth[dayNummer1].date, "mm/dd/yyyy", "/").getTime() < d.getTime()) {
              arrCalMonth[dayNummer1].disabled = true
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

    if (this.month1Number == undefined) {
      var d = new Date();
      this.month1Number = d.getMonth();
      this.year1 = d.getFullYear();
    }
    this.month1 = this.month[this.month1Number];
    
    if (this.month1Number == 11) {
      this.year2 = this.year1 + 1
      this.month2Number = 0
    }
    else {
      this.year2 = this.year1;
      this.month2Number = this.month1Number + 1
    }
    this.month2 = this.month[this.month2Number];
    this.setCalendar(this.month1Number, this.month2Number)

  }
  showSpecificMonth(){
    var selectedDateFromLeftPanel = "8/26/2017"
    this.arrivalDate =  this.stringToDate(selectedDateFromLeftPanel, "mm/dd/yyyy", "/")
    this.departureDate = new Date(this.arrivalDate.getTime() + (86400000))          
    this.month1Number = this.stringToDate(selectedDateFromLeftPanel, "mm/dd/yyyy", "/").getMonth()
    this.setStayNights();
  }
  showNextMonth() {
    if (this.month1Number == 11) {
      this.month1Number = 0;
      this.year1++;
    }
    else {
      this.month1Number++;
    }
    this.setMonth();
  }

  showPreviousMonth() {
    var d = new Date();


    if (this.month1Number <= d.getMonth() && this.year1 <= d.getFullYear()) {

    }
    else {
      if (this.month1Number == 0) {
        this.month1Number = 11;
        this.year1--;
      }
      else {
        this.month1Number--;
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
