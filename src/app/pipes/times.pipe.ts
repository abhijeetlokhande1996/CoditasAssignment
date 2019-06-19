import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'times'
})
export class TimesPipe implements PipeTransform {

  transform(value: number): any {
    let arrlen = null;
    if (value) {
      arrlen = Math.round(value / 5);
    } else {
      arrlen = 0;
    }
  return new Array(arrlen).fill(0);
  }

}
