import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'milisToMinutes',
  standalone: true
})
export class MilisToMinutesPipe implements PipeTransform {
  private MAX_MILISSECONDS = 1000;
  private MAX_MINUTES = 60;

  transform(value: number): unknown {
    return (value / (this.MAX_MILISSECONDS * this.MAX_MINUTES)).toFixed(2).replace('.', ':');
  }

}
