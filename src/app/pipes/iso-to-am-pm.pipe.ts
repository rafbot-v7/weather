import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isoToAmPm'
})
export class IsoToAmPmPipe implements PipeTransform {

  transform(value: string): string {
    console.log(!value);
    if(!value){
      return '';

    }
    const date = new Date(value)
    console.log(date);
    
    const currentHour = new Date().getUTCHours()
    let hours = date.getUTCHours()
    if(hours==currentHour){
      return `Now`
    }
   const ampm = hours>=12?'PM':'AM'
   hours = hours%12 || 12
   console.log(`${hours}:${ampm}`,'kjlkjfhdgs');
   
   return `${hours}:${ampm}`
  }

}
