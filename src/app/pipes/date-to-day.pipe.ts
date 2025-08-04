import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToDay'
})
export class DateToDayPipe implements PipeTransform {
days=['SUN','MON','TUE','WED','THU','FRI','SAT']
  transform(value: string, ): string {
if(!value){
  return ""
}
  let day = new Date(value).getUTCDay()
  console.log(day);
  
    return this.days[day]  ;
  }

}
