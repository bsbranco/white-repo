
import { map, tap, takeUntil, takeWhile } from 'rxjs/internal/operators';
import { Component, OnInit, Input } from '@angular/core';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'bb-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {


  diff: number;
  days: number;
  hours: number;

  minutes: number;

  seconds: number;
  @Input() endDate = '2020-01-01';

  constructor() { }

  ngOnInit() {
    const source = interval(1000).pipe(
      map(_ =>  Date.parse(this.endDate) - Date.parse(new Date().toString())),
      takeWhile((diff) => diff > 0)
    );

    const subscribe = source.subscribe(diff => {
     this.days = this.getDays(diff);
     this.hours = this.getHours(diff);
     this.minutes = this.getMinutes(diff);
     this.seconds = this.getSeconds(diff);
    });
  }

  getDays(t: number) {
    return Math.floor(t / (1000 * 60 * 60 * 24));
  }

  getHours(t: number) {
    return Math.floor((t / (1000 * 60 * 60)) % 24);
  }

  getMinutes(t: number) {
    return Math.floor((t / 1000 / 60) % 60);
  }

  getSeconds(t: number) {
    return Math.floor((t / 1000) % 60);
  }

}
