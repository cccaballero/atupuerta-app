import { Pipe, PipeTransform } from '@angular/core';
import TimeAgo from 'javascript-time-ago';
import es from 'javascript-time-ago/locale/es';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  timeAgo:any;

  constructor(){
    TimeAgo.addLocale(es)
    this.timeAgo = new TimeAgo('es-US');
  }

  transform(time: any): any {
    return this.timeAgo.format(new Date(time));
  }
}
