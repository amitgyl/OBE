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
  month1Name: string;
  month2Name: string;
  year1: any;
  year2: any;
  arrWeeksThisMonth: any[];
  arrWeeksNextMonth: any[];
  currency:any;
  lastDayOfPreviousMonthUnavailable:any;

  applyClass(a) {
    const isDepart = a.isDeparture &&  (a.availability>0)
    const isStaying = a.isStaying && (a.availability>0) && !a.notAvailableForDeparture
    const isArrive = a.isArrivalDate
    const isDisabled = a.disabled || (a.availability == undefined)
    const isNotAvailable = (a.availability < 1) && a.notAvailableForDeparture
    const isNotAvailableForArrival = (a.availability < 1) && !a.isStaying && !a.isDeparture
    const isNotAvailableForDeparture = a.notAvailableForDeparture && !a.isStaying
    const isHalfNotAvailableAndHalfStayin = a.notAvailableForDeparture && a.isStaying
    const isHalfStayinHalfAndNotAvailable = (a.isStaying && (a.availability < 1) ) || (a.isDeparture)    

    //later we can move the above code directly into the if statement

    if (isStaying){
      return 's-d'
    }
    if (isArrive){
      return 's-d arrival'
    }
    if (isDepart){
      return 's-d departure'
    }
    if (isDisabled){
      return 'disabled'
    }
    if (isNotAvailable){
      return "not-available n-a"
    }
    if (isNotAvailableForArrival){
      return "not-available n-a arrival"
    }
    if (isNotAvailableForDeparture){
      return "not-available n-a departure"
    }
    if (isHalfNotAvailableAndHalfStayin){
      return "booked-staying"
    }
    if (isHalfStayinHalfAndNotAvailable){
      return "staying-booked"
    }
    return 'r-a'  
  }

  constructor(private roomsAvailable: RoomsAvailableService) {

  }

  ngOnInit() {
    this.currency = "€"
    this.setStayNights()
    this.setMonthNameYear()
  }

  setStayNights() {
    this.availabilty = this.roomsAvailable.getAvailibility(this.arrivalDate, this.departureDate);
    if (!this.arrivalDate) {
      this.arrivalDate = new Date()
      //this.arrivalDate = new Date(this.arrivalDate.getFullYear(),this.arrivalDate.getMonth(),this.arrivalDate.getDate())
      this.arrivalDate = this.stringToDate(this.dateToString(this.arrivalDate),"mm/dd/yyyy", "/")
      this.arrivalDate = this.stringToDate("5/25/2017", "mm/dd/yyyy", "/") //to be later changed to today (above)
    }
    
    if (!this.departureDate) {
      this.departureDate = this.stringToDate("5/30/2017", "mm/dd/yyyy", "/")//to be later changed to tomorrow (below)
      //this.departureDate = new Date(this.arrivalDate.getTime() + (86400000))
    }
    this.numberOfNights = (this.departureDate - this.arrivalDate) / (1000 * 60 * 60 * 24)
    this.arrNightStay = new Array() //this array stores all the days excluding arrival and departure date
    for (var i = 0; i < this.numberOfNights - 1; i++) {
      this.arrNightStay[i] = new Date(this.arrivalDate.getTime() + ((i + 1) * (86400000)))
    }
  }

  setMonthNameYear() {
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    //month[12] = "January";

    if (this.month1Number == undefined) {
      var d = new Date();
      this.month1Number = d.getMonth();
      this.year1 = d.getFullYear();
    }
    this.month1Name = month[this.month1Number]; //gets monthName from month number

    if (this.month1Number == 11) {
      this.year2 = this.year1 + 1
      this.month2Number = 0
    }
    else {
      this.year2 = this.year1;
      this.month2Number = this.month1Number + 1
    }
    this.month2Name = month[this.month2Number];
    this.setCalendar(this.month1Number, this.month2Number)

  }

  setCalendar(month1Number, month2Number) {
    var arrThisMonth = new Array()
    var arrNextMonth = new Array()

    for (var i = 0; i < this.availabilty.availability.availabilityItem.length; i++) {
      if (
        month1Number == this.stringToDate(this.availabilty.availability.availabilityItem[i].date, "mm/dd/yyyy", "/").getMonth()
        &&
        this.year1 == this.stringToDate(this.availabilty.availability.availabilityItem[i].date, "mm/dd/yyyy", "/").getFullYear()
      ) {
        arrThisMonth.push(this.availabilty.availability.availabilityItem[i])
      }
      else if (
        month2Number == this.stringToDate(this.availabilty.availability.availabilityItem[i].date, "mm/dd/yyyy", "/").getMonth()
        &&
        this.year2 == this.stringToDate(this.availabilty.availability.availabilityItem[i].date, "mm/dd/yyyy", "/").getFullYear()
      ) {
        arrNextMonth.push(this.availabilty.availability.availabilityItem[i])
      }
    }

    this.arrWeeksThisMonth = this.fillMonth(arrThisMonth)
    //set the property lastDayOfPreviousMonthUnavailable so that appropriate style can be applied to 1st day of next month
    if (arrThisMonth[arrThisMonth.length-1].availability<1){
      this.lastDayOfPreviousMonthUnavailable = true
    }
    else{
      this.lastDayOfPreviousMonthUnavailable = false
    }

    this.arrWeeksNextMonth = this.fillMonth(arrNextMonth)

  }

  fillMonth(arrCalMonth) {
    var dayNummer = 0
    var dayInMonth = 0
    //dayNummer is for the td and dayInMonth is for index of element in availbilty array
    var arWeeks = new Array();

    var numberOfWeeks = 7
    //console.log(this.stringToDate(arrCalMonth[0].date, "mm/dd/yyyy", "/").getDay())
    if(arrCalMonth.length == 31){      
      if (this.stringToDate(arrCalMonth[0].date, "mm/dd/yyyy", "/").getDay()< 5){
        numberOfWeeks = 6
      }
    }
    else {      
      if (this.stringToDate(arrCalMonth[0].date, "mm/dd/yyyy", "/").getDay()< 6){
        numberOfWeeks = 6
      }
    }

    for (var i = 1; i <numberOfWeeks; i++) {
      var arrDays = new Array();
      for (var j = 1; j < 8; j++) {
        if ((dayInMonth < arrCalMonth.length) && (dayNummer % 7 == this.stringToDate(arrCalMonth[dayInMonth].date, "mm/dd/yyyy", "/").getDay())) {
          
          arrCalMonth[dayInMonth].day = this.stringToDate(arrCalMonth[dayInMonth].date, "mm/dd/yyyy", "/").getDate()
          
          if (arrCalMonth[dayInMonth].date == this.dateToString(this.arrivalDate)) {
            arrCalMonth[dayInMonth].isArrivalDate = true
          }

          else if (arrCalMonth[dayInMonth].date == this.dateToString(this.departureDate)) {         
            arrCalMonth[dayInMonth].isDeparture = true
          }

      //logic for applyClass start

          if (dayInMonth > 0) {
            if (arrCalMonth[dayInMonth-1].availability < 1) {
              arrCalMonth[dayInMonth].notAvailableForDeparture = true
            }
          }
          else{
            if (this.lastDayOfPreviousMonthUnavailable){
                 arrCalMonth[dayInMonth].notAvailableForDeparture = true
            }
          }
          //disable the first half of day if the last day of previous month was unavailable
          // if (!this.arrWeeksThisMonth){
          //   if (this.arrWeeksThisMonth.){

          //   }
          // }

          //disable past dates          
          var d = new Date()
          if (this.stringToDate(arrCalMonth[dayInMonth].date, "mm/dd/yyyy", "/") < this.stringToDate(this.dateToString(d),"mm/dd/yyyy", "/")) {
            arrCalMonth[dayInMonth].disabled = true
          }
          
          // if (arrCalMonth[dayInMonth].date == this.dateToString(this.arrivalDate)) {
          // }
          
          for (var k = 0; k < this.arrNightStay.length; k++) {
            if (this.dateToString(this.arrNightStay[k]) == arrCalMonth[dayInMonth].date) {
              arrCalMonth[dayInMonth].isStaying = true
            }
          }
      //logic for applyClass end
          arrDays.push(arrCalMonth[dayInMonth])
          dayInMonth++
        }
        else {//push an empty array
          var x = new Array()
          arrDays.push(x)
        }
        dayNummer++
      }
      arWeeks.push(arrDays)
    }
    // if (this.arrWeeksThisMonth){
    //   console.log(this.arrWeeksThisMonth[this.arrWeeksThisMonth.length-1].length)
    //   console.log(this.arrWeeksThisMonth[4][4])
    // }
    //  console.log("mk")
    return arWeeks    
  }
  
  showSpecificMonth() {
    var selectedDateFromLeftPanel = "8/26/2017"
    this.arrivalDate = this.stringToDate(selectedDateFromLeftPanel, "mm/dd/yyyy", "/")
    this.departureDate = new Date(this.arrivalDate.getTime() + (86400000))
    this.month1Number = this.stringToDate(selectedDateFromLeftPanel, "mm/dd/yyyy", "/").getMonth()
    this.setStayNights()
    this.setMonthNameYear()
  }

  showNextMonth() {
    if (this.month1Number == 11) {
      this.month1Number = 0
      this.year1++
    }
    else {
      this.month1Number++;
    }
    this.setMonthNameYear();
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
      this.setMonthNameYear();
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

  dateToString(dateObj){
    return (1+dateObj.getMonth())+"/"+dateObj.getDate()+"/"+dateObj.getFullYear()
  }

}
