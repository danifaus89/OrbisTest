import { Injectable } from '@angular/core';
import Moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  subtractDates(date1: string | number | Date, date2: string | number | Date) {
    var difference_ms = new Date(date1).getTime() - new Date(date2).getTime();
    //take out milliseconds
    difference_ms = difference_ms / 1000;
    var seconds = Math.floor(difference_ms % 60);
    difference_ms = difference_ms / 60;
    var minutes = Math.floor(difference_ms % 60);
    difference_ms = difference_ms / 60;
    var hours = Math.floor(difference_ms % 24);
    if (hours != 0)
      return hours + 'h ' + minutes.toString() + 'm ' + seconds.toString() + 's';
    else return minutes.toString() + 'm ' + seconds.toString() + 's';
  }

  getDateFromMinutes(minutes: number){
    let hour = Math.floor(minutes/60);

    hour>23 ?
      hour = hour - 24 : null
    let min = (minutes%60).toString();
    min.length<2 ? min='0'+min : null;

    return (hour)+':'+min;
  }

  update(objToUpdate: number[] | null | undefined, updateObj: null | undefined){
    if(objToUpdate!=null&&objToUpdate!=undefined&&updateObj!=null&&updateObj!=undefined){
      objToUpdate=updateObj;
    } else objToUpdate=[-1,-1,-1];
  }

  getFormatedLocalDate = (date = new Date(), format = 'YYYY-MM-DD') => {
      return Moment(date).local().format(format)
  }

  getFormatedUTCDate = (date = new Date(), format = 'YYYY-MM-DDTHH') => {
    return Moment(date).utc().format(format)
  }

}
