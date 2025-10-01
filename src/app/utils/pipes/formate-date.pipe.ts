import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formateDate'
})
export class FormateDatePipe implements PipeTransform {

  transform(value: string | Date): string {
    if (!value) return '';

    const date = new Date(value);

    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };

    const parts = new Intl.DateTimeFormat('en-GB', options).formatToParts(date);

    const day = parts.find(p => p.type === 'day')?.value;
    const month = parts.find(p => p.type === 'month')?.value;
    const year = parts.find(p => p.type === 'year')?.value;
    const hour = parts.find(p => p.type === 'hour')?.value;
    const minute = parts.find(p => p.type === 'minute')?.value;
    const second = parts.find(p => p.type === 'second')?.value;
    const dayPeriod = parts.find(p => p.type === 'dayPeriod')?.value?.toUpperCase();

    return `${day}-${month}-${year} ${hour}:${minute} ${dayPeriod}`;
  }

}
