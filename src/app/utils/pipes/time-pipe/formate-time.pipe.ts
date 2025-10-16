import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formateTime'
})
export class FormateTimePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
   console.log('formate time work', value)
   if(value){

     let timein24H= value;
     let timeArr= timein24H?.split(':')
     let hours = timeArr[0]
     let min = timeArr[1]
     return hours= +hours > 12 ? ((+hours-12)+'').padStart(2,'0') +':'+min +'PM' : hours +':'+min.padStart(2,'0') + 'AM'
   }
   return '';
  }

}
